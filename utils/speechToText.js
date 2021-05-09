import { isServer } from "./Helper";

const speechRecognition =
  !isServer && (window.SpeechRecognition || window.webkitSpeechRecognition);

const recognition = !isServer && new speechRecognition();

export const jpRecognition = ({ onStart, onSpeechStart, onSpeechEnd }) => {
  return new Promise((resolve, reject) => {
    recognition.lang = "ja-JP";
    recognition.onstart = (e) => onStart && onStart(e);
    recognition.onspeechstart = (e) => onSpeechStart && onSpeechStart(e);
    recognition.onspeechend = (e) => onSpeechEnd && onSpeechEnd(e);
    recognition.onend = (e) => onSpeechEnd && onSpeechEnd(e);
    recognition.onerror = (e) => {
      recognition.stop();
      reject(e);
    };
    recognition.onresult = (e) => {
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      resolve(transcript);
    };
    try {
      recognition.start();
    } catch (error) {
      console.log("Speech Recognition is already started!!!");
      recognition.stop();
    }
  });
};
