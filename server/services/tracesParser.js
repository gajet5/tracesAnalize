const fs = require('fs-extra');
const readline = require('readline');
const path = require('path');
const uploadModels = require(path.join(__basedir, 'models', 'uploads'));
const reportModels = require(path.join(__basedir, 'models', 'reports'));
const vocabularyModels = require(path.join(__basedir, 'models', 'vocabularys'));

module.exports = async (uploadId, reportId) => {
    const upload = await uploadModels.findById(uploadId);
    const lines = readline.createInterface({
        input: fs.createReadStream(upload.path),
        crlfDelay: Infinity
    });

    const filteredRows = [];

    for await (const line of lines) {
        if (/(ClickEvent|PageNavigationEvent)/.test(line)) {
            filteredRows.push(line);
        }
    }

    let report = [];

    for (let item of filteredRows) {
        let itemComponents = /(\d{1,}:\d{1,}:\d{1,}.\d{1,}).*(ClickEvent|PageNavigationEvent): (.*)/.exec(item);

        if (itemComponents[2] === 'ClickEvent') {
            let string = 'User clicked on ';
            let previousValue = '';
            let stringComponents = itemComponents[3].split('].[');

            stringComponents.forEach((value, index) => {
                stringComponents[index] = value.replace(/\[|]/, '');
            });

            for (let stringComponent of stringComponents) {
                if (/LOC/.test(stringComponent)) {
                    if (/Button/.test(stringComponent)) {
                        if (string === 'User clicked on ') {
                            string += 'Button: ';
                        } else {
                            string += ' -> Button: ';
                        }
                    }

                    let result = /LOC:(\w{1,}) ?(?:Command:)?(\w{1,})?/.exec(stringComponent);
                    let valueInDictionary = await vocabularyModels.find({
                        key: result[1]
                    });

                    if (valueInDictionary && valueInDictionary.length === 1) {
                        string += `${valueInDictionary[0].value}`;
                    } else if (valueInDictionary && valueInDictionary.length > 1) {
                        let keyword = /^ *([A-Z][a-z]{1,})/.exec(stringComponent)[1];

                        if (keyword === 'Button') {
                            keyword = result[1];
                        }

                        for (let item of valueInDictionary) {
                            if (new RegExp(keyword).test(item.value)) {
                                string += `${item.value}`;
                                break;
                            }
                        }
                    } else {
                        string += `${result[1]}`;
                    }

                    if (result[2]) {
                        string += ` and executed command ${result[2]}`;
                    }
                }

                if (/ListView /.test(stringComponent)) {
                    let itemsInList = /Items\.Count:([0-9]{1,})/.exec(stringComponent)[1];
                    string += ` -> ListView (Items count: ${itemsInList})`;
                }

                if (/ListViewItem /.test(stringComponent)) {
                    let targetItem = /AlternationIndex:([0-9]{1,})/.exec(stringComponent)[1];
                    string += ` -> ListViewItem (Item position: ${parseInt(targetItem) + 1})`;
                }
                
                if (/ComboBox /.test(stringComponent)) {
                    let itemsInComboBox = /Items\.Count:([0-9]{1,})/.exec(stringComponent)[1];
                    string += ` -> ComboBox (Items count: ${itemsInComboBox})`;
                }

                if (/ComboBoxItem /.test(stringComponent)) {
                    let comboBoxSelected = /DataContext:(.*) AlternationIndex:([0-9]{1,})/.exec(stringComponent);
                    string += ` -> Selected: ${comboBoxSelected[1]} (Item position: ${parseInt(comboBoxSelected[2]) + 1})`;
                }
                
                if (/ToggleButton /.test(stringComponent)) {
                    string += ` -> ToggleButton`;
                }

                if (/ListBox /.test(stringComponent)) {
                    let indexOfArray = stringComponents.findIndex(value => value === stringComponent);
                    let listItem = /DataContext:(\w{1,})/.exec(stringComponents[indexOfArray + 1])[1];
                    string += ` -> ${listItem}`;
                }

                if (stringComponent === 'ProtectionSettingsPage') {
                    string += ' -> Protection Settings';

                    let indexOfArray = stringComponents.findIndex(value => value === stringComponent);
                    let protectionItem = /ProtectionSettings:(\w{1,})/.exec(stringComponents[indexOfArray + 2])[1];
                    let valueInDictionary = await vocabularyModels.findOne({
                        key: protectionItem
                    });

                    if (valueInDictionary) {
                        string += ` -> ${valueInDictionary.value}`;
                    } else {
                        string += ` -> ${protectionItem}`;
                    }
                }

                if (/IsChecked/.test(stringComponent)) {
                    previousValue = /IsChecked:(\w{1,})/.exec(stringComponent)[1];
                }

                if (/Slider /.test(stringComponent)) {
                    string += ` -> ${stringComponent}`;
                }
            }

            if (previousValue) {
                string += ` [Previous Value: ${previousValue}]`;
            }

            report.push({
                time: itemComponents[1],
                event: itemComponents[2],
                string,
                source: itemComponents[3]
            });
        } else {
            let string = `This window was opened: `;
            let components = itemComponents[3].split('.');
            let exceptions = {
                'KasperskyLab': false,
                'UI': false,
                'View': false
            };

            for (let component of components) {
                if (component in exceptions) {
                    continue;
                }

                if (new RegExp(component).test(string)) {
                    continue;
                }

                if (string.length === 24) {
                    string += component;
                } else {
                    string += ` -> ${component}`;
                }
            }
            
            report.push({
                time: itemComponents[1],
                event: itemComponents[2],
                string,
                source: itemComponents[3]
            });
        }
    }

    await reportModels.findByIdAndUpdate(reportId, {
        parsed: true,
        report
    });

    await fs.remove(upload.path);
};
