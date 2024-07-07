# InSummary

InSummary is a web application that allows users to record audio, transcribe it in real-time using Deepgram's API, and download the transcribed text. The application uses Flask for the backend, WebSockets for real-time communication, and vanilla JavaScript for frontend interactivity.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- Record audio directly from the browser.
- Real-time transcription of audio using Deepgram's API.
- Display transcription in a user-friendly interface.
- Download transcribed text as a .txt file.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.6+
- Flask
- Flask-SocketIO
- WebSockets support in the browser
- Deepgram API key

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/InSummary.git
    cd InSummary
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:

    - Create a `.env` file in the root directory.
    - Add your Deepgram API key:

        ```plaintext
        DEEPGRAM_API_KEY=your_deepgram_api_key
        ```

5. Run the application:

    ```bash
    flask run
    ```

## Usage

1. Open your web browser and navigate to `http://127.0.0.1:5000`.
2. Click on the "Record" button to start recording audio.
3. The transcription will appear in the transcription box in real-time.
4. Click the "Download" button to save the transcription as a .txt file.

## Project Structure

/inSummary
├── base.py          # Flask server and routes
├── transcribe.py    # Module containing transcription related classes and functions
├── summarise.py     # Module containing summarization related classes and functions
├── static/          # Directory for static files (CSS, JS, images)
│   ├── css/
│   │   └── style.css
│   │   └── landing.css
│   │   └── index.css
│   │   └── landing1.css
│   │   └── 404.css
│   ├── js/
│   │   └── landing.js
│   │   └── index.js
│   │   └── landing1.js
│   └── images/
│       ├── vecteezy_audio-recording-icon-on-transparent-background_199404162-200h.png
│       ├── istock-1466243153-1500w.jpg
│       └── istockphoto-1443156018-612x612-300h.jpg 
│       ├── microphone-200h.png
├── templates/       # HTML templates
│   ├── index.html
│   ├── landing.html
│   └── landing1.html
│   ├── 404.html
└── uploads/         # Temporary directory for file uploads
│   └── Bueller-Life-moves-pretty-fast.wav
│   └── Ghanas Kwame Nkrumah and the dream of uniting Africa.mp3
│   └── trial.txt
