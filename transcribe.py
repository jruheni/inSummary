import os
import asyncio
from deepgram import Deepgram

# Set your Deepgram API key directly for this example
DEEPGRAM_API_KEY = 'f96e8d1f1ed6467b4bdea295ff4c8b6cf923585a'


async def transcribe_audio(AUDIO_FILE_PATH):
    try:
        # Create a Deepgram client using your API key
        deepgram = Deepgram(DEEPGRAM_API_KEY)

        # Define the transcription options
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
        mimetype = 'audio/wav'  # Adjust this if your audio file is of a different type, e.g., 'audio/mp3'

        # Call the transcribe method for local files with MIME type
        response = await deepgram.transcription.prerecorded({
            'buffer': audio_bytes,
            'mimetype': mimetype
        }, options)
        
        transcript = response['results']['channels'][0]['alternatives'][0]['transcript']
        return transcript

    except Exception as e:
        print(f"Exception: {e}")

