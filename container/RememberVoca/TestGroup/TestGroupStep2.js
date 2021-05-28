import React from "react";
import { useSelector } from "react-redux";
import { randomList } from "../../../utils/Helper";
import TestGroupStep2UI from "./TestGroupStep2UI";

export function TestGroupStep2() {
  const { list } = useSelector(state => state.vocas);
  const optionsMeaning = React.useMemo(() => list.map(el => el.meaning).sort((a, b) => a > b ? 1 : -1), [list]);
  const [vocasForTest, setVocasForTest] = React.useState([]);
  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    setVocasForTest(randomList(list));
  }, [list]);
  const voca = { ...list[1], isIn: true }


  return <TestGroupStep2UI
    optionsMeaning={optionsMeaning}
    voca={voca}
  />
}