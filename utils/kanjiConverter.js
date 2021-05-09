import { isServer } from "./Helper";

let kuroshiro;

async function initKuroShiro() {
  console.log("INIT KUROSHIRO");
  if (isServer) return;
  const _kuroshiro = new window.Kuroshiro();
  await _kuroshiro.init(new window.KuromojiAnalyzer({ dictPath: "/library" }));
  kuroshiro = _kuroshiro;
}

initKuroShiro();

export const jpConverter = async (content) => {
  if (!kuroshiro) {
    await initKuroShiro();
  }
  return await kuroshiro.convert(content);
};
