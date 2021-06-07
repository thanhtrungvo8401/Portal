import React from "react";
import Instruction_Step2 from "components/organisms/test-vocas-[id]/step-2/instruction";
import { BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import DividerItem from "components/atoms/devider-item";
import HorizontalMoveCover from "components/molecules/horizontal-move-cover";
import { useSelector } from "react-redux";
import { isEmptyArr, randomList } from "utils/Helper";
import FollowCatBtn from "components/molecules/follow-cat-btn";

export default function TestGroupStep2({ }) {
  const { list } = useSelector(state => state.vocas);
  const [vocas, setVocas] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [vocaQA, setVocaQA] = React.useState({});
  const [readyToStart, setReadyToStart] = React.useState({ isIn: true, ready: false });

  const handleGetVocaQA = () => {
    if (!isEmptyArr(vocas)) {
      const newVocaQA = vocas[0];
      const newVocas = vocas.slice(1); // get element from 1 - end:
      setResults([...results, vocaQA]);
      setVocaQA({ ...newVocaQA, isIn: true });
      setVocas(newVocas);
    }
  }


  React.useEffect(() => {
    if (list.length) setVocas(randomList([...list]));
  }, [list]);

  React.useEffect(() => {
    if (readyToStart.ready) handleGetVocaQA();
  }, [readyToStart.ready]);

  return <React.Fragment>
    <Instruction_Step2 />
    <BodyTop>
      {readyToStart.ready &&
        <React.Fragment>
          <TitleBody>Nghe cách đọc chọn nghĩa tiếng việt</TitleBody>
          <DividerItem />

          <HorizontalMoveCover isActive={!!vocaQA.isIn} >
            <img src="/image/audio.png" />
          </HorizontalMoveCover>
        </React.Fragment>}

      {!readyToStart.ready &&
        <FollowCatBtn
          isIn={readyToStart.isIn}
          description={"Tôi đã đọc và nắm rõ đề bài"}
          onClick={() => setReadyToStart({ ...readyToStart, isIn: false })}
          onExited={() => {
            setReadyToStart({ ...readyToStart, ready: true });
          }}
        />}
    </BodyTop>
  </React.Fragment>
}