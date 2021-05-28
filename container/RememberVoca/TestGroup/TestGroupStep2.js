import { useSelector } from "react-redux";
import TestGroupStep2UI from "./TestGroupStep2UI";

export function TestGroupStep2() {
  const { list } = useSelector(state => state.vocas);
  const optionsMeaning = list.map(el => el.meaning).sort((a, b) => a > b ? 1 : -1);
  const voca = { ...list[1], isIn: true }
  return <TestGroupStep2UI optionsMeaning={optionsMeaning} voca={voca} />
}