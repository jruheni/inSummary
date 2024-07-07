const recordButton = document.getElementById('recordButton');
let mediaRecorder;
let socket;

recordButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        socket.close();
    } else {
        startRecording();
    }
});

function startRecording() {
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {mimeType: 'audio/webm'})
        const DEEPGRAM_API_KEY = 'f96e8d1f1ed6467b4bdea295ff4c8b6cf923585a'

        const socket = new WebSocket('wss://api.deepgram.com/v1/listen', ['token', DEEPGRAM_API_KEY])

        socket.onopen = () => {
            mediaRecorder.addEventListener('dataavailable', event => {
                socket.send(event.data)
            })
            mediaRecorder.start(250)
        }

        socket.onmessage = (message) => {
            const received = JSON.parse(message.data)
            const transcript = received.channel.alternatives[0].transcript
            console.log(transcript)
        }

    })
}