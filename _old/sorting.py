import os, json
from flask import Flask, render_template, request, redirect, url_for, flash, Response
from werkzeug import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = '/home/sammy/myproject/downloads'
ALLOWED_EXTENSIONS = set(['log'])

with open ('ltsresult.txt', 'r', encoding='utf-8', errors='ignore') as f: lt_dict = {x.split('=')[0].strip(): x.split('=')[1].strip().replace("'","") for x in f.readlines() if '=' in x}


app = Flask(__name__)
CORS(app)
#app.secret_key = ''
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def file_handle(filename):
	with open ('./downloads/{}'.format(filename), 'r', errors='ignore') as f: log_file = f.readlines()

	outjson = {'lines':[]}
	count, choosen_filter = 1, 0
	for line in log_file:
		if len(line) > 10: text_time = line.split()[0]

		if 'Sending ClickEvent: ' in line:
			choosen_filter = 1
			line = line.split('Sending ClickEvent: ')[-1].strip()
			text_click, text_loc, text_com, text_act, text_info = '', '', '', '', ''
			line_parts = line.strip().split('].[')
			for part in reversed(line_parts):
				part = part.replace(']', '').replace('[', '').split(' ')
				for value in part:
					if ':' not in value and not text_click: text_click = value
					splitted_value = value.split(':')
					if splitted_value[0] == 'LOC' and not text_loc: text_loc = splitted_value[1]
					elif splitted_value[0] == 'Command' and not text_com: text_com = splitted_value[1]
					elif splitted_value[0] == 'Action' and not text_act: text_act = splitted_value[1]
					elif splitted_value[0] == 'Info' and not text_info: text_info = splitted_value[1]+ '-'
					elif splitted_value[0] == 'DataContext' and text_click == 'ListBoxItem': text_loc = splitted_value[1]
					elif splitted_value[0] == 'AlternationIndex' and not text_loc: text_loc = 'Item №'+ splitted_value[1]
			text = "User clicked on {}{}".format(text_info, text_click)

			if text_click in lt_dict and lt_dict[text_click]!=text_click: text_click+='/{}'.format(lt_dict[text_click].replace('  ', ' '))
			if text_loc in lt_dict and lt_dict[text_loc]!=text_loc: text_loc+='/{}'.format(lt_dict[text_loc].replace('  ', ' '))
			if text_com in lt_dict and lt_dict[text_com]!=text_com: text_com+='/{}'.format(lt_dict[text_com].replace('  ', ' '))

			if text_loc not in ['', text_click]: text+= " '{}'".format(text_loc)
			if text_com not in ['', 'Command']: text+= " and executed command '{}'".format(text_com)
			if text_act not in ['']: text+= " in order to {}".format(text_act)

			jtext = text

		elif 'Sending PageNavigationEvent: ' in line:
			choosen_filter = 2
			line = line.split('Sending PageNavigationEvent: ')[-1].strip()
			jtext = 'This window was opened: {}'.format(line.replace('.', '->').replace('UI->', '').replace('View->', '')[14:])

		else: continue

		outjson['lines'].append({'line':line})
		
		if choosen_filter == 1:
			outjson['lines'][-1]['type'] = 'ClickEvent'
			outjson['lines'][-1]['params'] = {}
			outjson['lines'][-1]['params']['TClick'] = text_click
			outjson['lines'][-1]['params']['TLoc'] = text_loc
			outjson['lines'][-1]['params']['TCom'] = text_com
			outjson['lines'][-1]['params']['TAct'] = text_act
		
		else: outjson['lines'][-1]['type'] = 'PageNavigationEvent'

		outjson['lines'][-1]['text'] = jtext
		outjson['lines'][-1]['time'] = text_time

		if count == -1: break #Пока немного рефачил код, чтобы тебе отправить, начал задумываться, зачем этот if (ибо вроде никогда значение -1 не принимает), но уже подзабыл :))
		else: count +=1
	return outjson

@app.route('/', methods = ['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		if not allowed_file(file.filename):
			flash('Upload only .log files!')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)

			files = os.listdir(app.config['UPLOAD_FOLDER'])
			for f in files: os.remove(os.path.join(app.config['UPLOAD_FOLDER'], f))

			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			result_json = file_handle(filename)
			js = json.dumps(result_json)
			resp = Response(js, status=200, mimetype='application/json')
			return resp
	return render_template('upload.html')

@app.route('/uploaded_file', methods = ['GET'])
def uploaded_file():
	print(filename)
	return render_template('uploaded.html', filename=request.args['filename'])

if __name__ == '__main__':
	app.run(host = '0.0.0.0', debug = True)
