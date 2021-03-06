const path = require('path');

module.exports = {
    server: {
        port: 5001,
        uploadsDir: path.join(__basedir, 'uploads'),
        uploadsTracesDir: path.join(__basedir, 'uploads', 'traces'),
        uploadsVocabularyDir: path.join(__basedir, 'uploads', 'vocabulary')
    },
    mongo: {
        url: 'mongodb://localhost:27017/tracesAnalyzer'
    },
    mail: {
        service: 'Yandex',
        auth: {
            user: '',
            password: ''
        }
    },
    regexp: {
        vocabulary: /([\w]+) *= *'([\w -]+)\.?:?'/
    }
};
