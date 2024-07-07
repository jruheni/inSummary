# inSummary

inSummary is a web application that allows users to record audio, transcribe it in real-time using Deepgram's API, and download the transcribed text. The application uses Flask for the backend, WebSockets for real-time communication, and vanilla JavaScript for frontend interactivity.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- Record audio directly from the browser.
- Summarise transcripted text
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
    or
   
   ```
   python3.9 base.py
   ```

## Usage

1. Open your web browser and navigate to `http://127.0.0.1:5000`.
2. Click on the "Record" button to start recording audio.
3. The transcription will appear in the transcription box in real-time.
4. Click the "Download" button to save the transcription as a .txt file.

## Project Structure

![image](https://github.com/jruheni/inSummary/assets/135020620/9391d9b5-859f-4d02-8677-dc6c456b38cf)


