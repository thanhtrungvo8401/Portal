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
      const errMsg = `Error: Failed to execute 'start' on 'SpeechRecognition': recognition has already`;
      if (JSON.stringify(error.stack).includes(errMsg)) {
        // check if starting failed due to recognition has already started
        //  => STOP then RESTART
        recognition.onend = (e) => {
          // restart right-after recognition stop succesfully!
          console.log("STOP then restart");
          recognition.start();
        };
        recognition.onstart = (e) => {
          // redefine onend event when restart successully!
          onStart && onStart();
          recognition.onend = (e) => onSpeechEnd && onSpeechEnd(e);
          console.log("RESTART SUCCESSULLY");
        };
      }
      // _.abort() = _.stop() but did not trigger onresult.
      recognition.abort();
    }
  });
};
