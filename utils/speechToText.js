import { isServer } from "./Helper";

const speechRecognition =
  !isServer && (window.SpeechRecognition || window.webkitSpeechRecognition);

const recognition = !isServer && new speechRecognition();

export const jpRecognition = ({
  onStart,
  onSpeechStart,
  onSpeechEnd,
  onError,
  onResult,
}) => {
  recognition.lang = "ja-JP";
  recognition.onstart = (e) => onStart && onStart(e);
  recognition.onspeechstart = (e) => onSpeechStart && onSpeechStart(e);
  recognition.onspeechend = (e) => onSpeechEnd && onSpeechEnd(e);
  recognition.onerror = (e) => onError && onError(e);
  recognition.onresult = (e) => {
    const current = e.resultIndex;
    const transcript = e.results[current][0].transcript;
    onResult(transcript);
  };
  return recognition;
};
