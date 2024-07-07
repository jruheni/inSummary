document.addEventListener('DOMContentLoaded', () => {
  const recordButton = document.getElementById('recordButton');
  const recordingAnimation = document.getElementById('recordingAnimation');
  const transcriptionBox = document.getElementById('transcriptionBox');
  const downloadButton = document.getElementById('downloadButton');

  let mediaRecorder;
  let socket;
  let transcriptionText = "";

  recordButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      socket.close();
    } else {
      startRecording();
    }
  });

  function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const DEEPGRAM_API_KEY = 'f96e8d1f1ed6467b4bdea295ff4c8b6cf923585a';

      socket = new WebSocket('wss://api.deepgram.com/v1/listen', ['token', DEEPGRAM_API_KEY]);

      socket.onopen = () => {
        console.log('WebSocket connection established');
        mediaRecorder.addEventListener('dataavailable', event => {
          socket.send(event.data);
        });
        mediaRecorder.start(250);
        recordingAnimation.style.display = 'block';
      };

      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        transcriptionText += transcript + " ";
        transcriptionBox.textContent = transcriptionText;
        downloadButton.style.display = 'block';
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        recordingAnimation.style.display = 'none';
      };
    }).catch(error => {
      console.error('Error accessing microphone:', error);
    });
  }

  downloadButton.addEventListener('click', () => {
    const blob = new Blob([transcriptionText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'transcription.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  });
});
