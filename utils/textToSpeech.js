import { isServer } from "./Helper";

const speakHelper = (content, lang, speed, callback) => {
  if (!speechSynthesis.getVoices().length) {
    speechSynthesis.onvoiceschanged = (e) => {
      console.log("VOICE READY");
      speakHelper(content, lang, speed, callback);
    };
    return;
  }
  if (!content || typeof content !== "string") return;
  if (isServer) return;
  if (speechSynthesis.speaking) {
    console.log("We are speaking, please waiting!!!");
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(content);

  utterThis.pitch = 1;
  utterThis.rate = speed;
  utterThis.voice = speechSynthesis.getVoices().find((el) => el.lang === lang);
  speechSynthesis.speak(utterThis);

  utterThis.onend = function (event) {
    if (callback) callback();
  };
  utterThis.onerror = function (event) {
    console.error("SpeechSynthesisUtterance.onerror", event);
  };
};

export const jpSpeak = ({ content = "", speed = 1, callback }) => {
  speakHelper(content, "ja-JP", speed, callback);
};

export const otherSpeack = ({ content = "", speed = 1, callback }) => {
  speakHelper(content, "en-US", speed, callback);
};
