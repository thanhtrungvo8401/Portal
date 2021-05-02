import { isServer } from "./Helper";

const getVoices = () => {
  return new Promise((resolve, reject) => {
    if (isServer) reject("This function can not be called in server");

    if (speechSynthesis.getVoices().length > 0) {
      resolve(speechSynthesis.getVoices());
    } else {
      speechSynthesis.onvoiceschanged = () => {
        resolve(speechSynthesis.getVoices());
      };
    }
  });
};

const speakHelper = (content, lang, speed) => {
  return new Promise((resolve, reject) => {
    if (!content || typeof content !== "string") {
      reject(content + ": Content must not be string and not empty !!!");
    }
    if (isServer) reject("This function can not be called in server");
    // cancle all current speaking action to speak a new word:
    speechSynthesis.cancel();

    const utterThis = new SpeechSynthesisUtterance(content);
    utterThis.onerror = (e) => {
      reject(e);
    };
    utterThis.onend = () => {
      resolve(`"${content}" was spoken !!!`);
    };
    getVoices().then((voices) => {
      utterThis.pitch = 1;
      utterThis.rate = speed;
      utterThis.voice = voices.find((el) => el.lang === lang);
      speechSynthesis.speak(utterThis);
    });
  });
};

export const jpSpeak = ({ content, speed = 1 }) => {
  return speakHelper(content, "ja-JP", speed);
};

export const otherSpeack = ({ content, speed = 1 }) => {
  return speakHelper(content, "en-GB", speed);
};
