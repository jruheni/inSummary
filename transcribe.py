import os
from deepgram import Deepgram, transcription
from dotenv import load_dotenv

load_dotenv()
DEEPGRAM_API_KEY = os.getenv('DEEPGRAM_API_KEY')


async def transcribe_audio(AUDIO_FILE_PATH):
    try:
        deepgram = Deepgram(DEEPGRAM_API_KEY)


        options = {
            'model': 'nova',
            'smart_format': True,
            'summarize': 'v2'
        }

        # Open the audio file in binary mode
        with open(AUDIO_FILE_PATH, 'rb') as audio:
            # Read the audio file content
            audio_bytes = audio.read()

        # Define the MIME type based on the audio file extension
        mimetype = 'audio/wav'  # Adjust this if the audio file is of a different type, e.g., 'audio/mp3'

        # Call the transcribe method for local files with MIME type
        response = await deepgram.transcription.prerecorded({
            'buffer': audio_bytes,
            'mimetype': mimetype
        }, options)
        
        transcript = response['results']['channels'][0]['alternatives'][0]['transcript']
        return transcript

    except Exception as e:
        print(f"Exception: {e}")

async def transcribe_audio_stream(audio_data):
    try:
        options = {
            'model': 'nova',
            'smart_format': True,
            'summarize': 'v2'
        }

        # Call the transcribe method for streaming audio
        response = await transcription.live({
            'buffer': audio_data,
            'mimetype': 'audio/wav'
        }, options)
        
        transcript = response['results']['channels'][0]['alternatives'][0]['transcript']
        return transcript

    except Exception as e:
        print(f"Exception: {e}")
        return None
