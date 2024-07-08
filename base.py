from flask import Flask, render_template, request, redirect, url_for, send_file, jsonify
from tempfile import NamedTemporaryFile
from flask_socketio import SocketIO, emit
from summary import *
from transcribe import *
import os
import asyncio

# Create Flask app and SocketIO instance
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

UPLOAD_FOLDER = os.path.join(app.root_path, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load environment variables from .env file
load_dotenv()

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/landing')
def landing():
    return render_template('landing.html')

@app.route('/landing1')
def landing1():
    return render_template('landing1.html')

@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    try:
        # Save the uploaded audio file temporarily
        audio_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(audio_path)
        
        # Transcribe audio
        transcription_text = asyncio.run(transcribe_audio(audio_path))
        
        # Create a temporary text file for the transcription
        with NamedTemporaryFile(delete=False, suffix='.txt', dir=UPLOAD_FOLDER) as tmp_file:
            tmp_file.write(transcription_text.encode('utf-8'))
            tmp_filename = os.path.basename(tmp_file.name)
        
        # Provide download link to the user
        download_link = url_for('download_file', filename=tmp_filename, _external=True)
        
        # Render the template with transcription result and download link
        return render_template('upload.html', transcription=transcription_text, download_link=download_link)
    
    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/api/key', methods=['GET'])
def get_key():
    return jsonify({'key': os.getenv('DEEPGRAM_API_KEY')})


@app.route('/download/<filename>')
def download_file(filename):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return "File not found", 404
if __name__ == '__main__':
    app.run(debug=True)