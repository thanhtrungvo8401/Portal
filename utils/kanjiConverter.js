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
  return await kuroshiro.convert(content, { to: "hiragana" });
};


export const jpPronouceCompair = async (voca1, voca2) => {
  return true;
  // try {
  //   const read1 = await jpConverter(voca1);
  //   const read2 = await jpConverter(voca2);
  //   return read1 === read2;
  // } catch (error) {
  //   return false;
  // }
}