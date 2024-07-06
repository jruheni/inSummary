// script.js
const recordButton = document.getElementById('recordButton');
const recordingAnimation = document.getElementById('recordingAnimation');

let mediaRecorder;
let audioChunks = [];

recordButton.addEventListener('click', () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
  } else {
    startRecording();
  }
});

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      recordingAnimation.style.display = 'block';

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        recordingAnimation.style.display = 'none';
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        audioChunks = [];
        convertToMp3(audioBlob);
      });
    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
    });
}

function convertToMp3(audioBlob) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(audioBlob);
  reader.onloadend = () => {
    const audioData = reader.result;
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(audioData, buffer => {
      const wavToMp3 = new WavToMp3();
      const mp3Buffer = wavToMp3.convert(buffer);
      downloadMp3(mp3Buffer);
    });
  };
}

function downloadMp3(mp3Buffer) {
  const mp3Blob = new Blob([mp3Buffer], { type: 'audio/mp3' });
  const url = URL.createObjectURL(mp3Blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recording.mp3';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

// WavToMp3 class definition (using libmp3lame.js)
class WavToMp3 {
  constructor() {
    this.mp3encoder = new lamejs.Mp3Encoder(1, 44100, 128); // Mono, 44.1kHz, 128kbps
  }

  convert(buffer) {
    const samples = this.interleave(buffer);
    const mp3Data = this.encode(samples);
    return new Uint8Array(mp3Data);
  }

  interleave(buffer) {
    const left = buffer.getChannelData(0);
    const right = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : left;
    const length = left.length + right.length;
    const result = new Float32Array(length);

    for (let i = 0; i < left.length; i++) {
      result[2 * i] = left[i];
      result[2 * i + 1] = right[i];
    }
    return result;
  }

  encode(samples) {
    const sampleBlockSize = 1152;
    let mp3Data = [];
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = this.mp3encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
    const mp3buf = this.mp3encoder.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
    return mp3Data;
  }
}


