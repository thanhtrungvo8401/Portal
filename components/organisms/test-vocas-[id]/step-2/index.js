import React from "react";
import Instruction_Step2 from "components/organisms/test-vocas-[id]/step-2/instruction";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";
import DividerItem from "components/atoms/devider-item";
import HorizontalMoveCover from "components/molecules/horizontal-move-cover";
import { useSelector } from "react-redux";
import { isEmptyArr, randomList, sortAscBaseOnId } from "utils/Helper";
import FollowCatBtn from "components/molecules/follow-cat-btn";
import { Autocomplete } from "@material-ui/lab";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { jpSpeak } from "utils/textToSpeech";
import ActionsBtnGroup from "components/atoms/action-btns-group";
import AudioIcon from "components/atoms/audio-icon";
import { constantApp } from "utils/Constant";

const useStyles = makeStyles(theme => ({
  selection: {
    "& .MuiFormControl-root.MuiTextField-root": {
      marginTop: theme.spacing(1)
    }
  }
}))

export default function TestGroupStep2({ onFinishStep2 }) {
  const classes = useStyles();
  const { list } = useSelector(state => state.vocas);
  const [vocas, setVocas] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [vocaQA, setVocaQA] = React.useState({});
  const [time, setTime] = React.useState(0);
  const [readyToStart, setReadyToStart] = React.useState({ isIn: true, ready: false });
  const optionsMeaning = React.useMemo(() => [...list].sort(sortAscBaseOnId).map(el => el.meaning), [list]);

  const handleGetVocaQA = () => {
    if (!isEmptyArr(vocas)) {
      const newVocaQA = vocas[0];
      const newVocas = vocas.slice(1); // get element from 1 - end:
      setResults([...results, { ...vocaQA, time: Date.now() - time - constantApp.animationDuration }]);
      setVocaQA({ ...newVocaQA, isIn: true, result: "" });
      setVocas(newVocas);
    } else {
      onFinishStep2([...results, { ...vocaQA, time: Date.now() - time - constantApp.animationDuration }])
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
          <BodyMaxWidth>
            <HorizontalMoveCover
              isActive={!!vocaQA.isIn}
              onExited={() => handleGetVocaQA()}
              onEntered={() => {
                jpSpeak({ content: vocaQA.voca })
                  .then(res => setTime(Date.now()))
                  .catch(err => console.log(err))
              }}
            >
              <div onClick={() => jpSpeak({ content: vocaQA.voca })} style={{ cursor: "pointer" }} >
                <AudioIcon />
              </div>
            </HorizontalMoveCover>
            <DividerItem />

            <Autocomplete className={classes.selection}
              id="select-result" freeSolo
              options={optionsMeaning}

              renderInput={params => (
                <TextField {...params} label="Nghĩa của từ" margin="normal" variant="outlined" />
              )}
              onChange={(e, value, reason) => { setVocaQA({ ...vocaQA, result: value }) }}
              value={vocaQA.result || ""}
            />
            <DividerItem />

            <ActionsBtnGroup center >
              <Button color="primary" disabled={!vocaQA.result} variant="contained"
                onClick={() => { setVocaQA({ ...vocaQA, isIn: false }) }}
              >
                Chốt đáp án
              </Button>
            </ActionsBtnGroup>
          </BodyMaxWidth>
        </React.Fragment>
      }

      {!readyToStart.ready &&
        <FollowCatBtn
          isIn={readyToStart.isIn}
          description={"Tôi đã đọc và nắm rõ đề bài"}
          onClick={() => setReadyToStart({ ...readyToStart, isIn: false })}
          onExited={() => {
            setReadyToStart({ ...readyToStart, ready: true });
          }}
        />
      }
    </BodyTop>
  </React.Fragment>
}