from flask import Flask, render_template, request, redirect, url_for, send_file
from tempfile import NamedTemporaryFile
from summary import *
from transcribe import *

# current module (__name__) as argument.
app = Flask(__name__)

# The route() function of the Flask class is a decorator, which tells the application which URL should call the associated function.
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    try:
        # Save the uploaded audio file temporarily
        audio_path = os.path.join(app.root_path, 'uploads', file.filename)
        file.save(audio_path)
        
        # Transcribe audio
        transcription_text = asyncio.run(transcribe_audio(audio_path))
        
        # Create a temporary text file for the transcription
        with NamedTemporaryFile(delete=False, suffix='.txt') as tmp_file:
            tmp_file.write(transcription_text.encode('utf-8'))
            tmp_filename = tmp_file.name
        
        # Provide download link to the user
        download_link = url_for('download_file', filename=tmp_filename, _external=True)
        
        # Render the template with transcription result and download link
        return render_template('upload.html', transcription=transcription_text, download_link=download_link)
    
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/download/<filename>')
def download_file(filename):
    return send_file(filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)