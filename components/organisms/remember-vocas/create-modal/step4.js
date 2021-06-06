import { Button, Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import ListVocabularies from "components/molecules/list-vocabularies";
import { theme } from "components/theme";
import { useDispatch, useSelector } from "react-redux";
import { serviceFetVocaBySetId } from "service/vocaService";
import { MAX_VOCA_IN_REMEMBER } from "utils/Constant";
import { getRandom } from "utils/Helper";

const getRandomObject = (items) => {
  let total = items.length;
  const listOfNumber = [];
  while (total >= MAX_VOCA_IN_REMEMBER) {
    listOfNumber.push(MAX_VOCA_IN_REMEMBER);
    total -= MAX_VOCA_IN_REMEMBER;
  }
  if (total >= 5) {
    listOfNumber.push(total);
    total = 0;
  } else {
    while (total > 0) {
      for (let i = 0; i < listOfNumber.length; i++) {
        if (total > 0) {
          listOfNumber[i] = listOfNumber[i] + 1;
          total--;
        } else break;
      }
    }
  }
  // lastItem >= 5, if lastItem < 5 => increase previous value one by one
  // total = 19 => [7, 7, 5]
  // total = 18 => [9, 9]

  const object = {};
  listOfNumber.forEach((num, index) => {
    const oneList = [];
    for (let i = 1; i <= num; i++) {
      const random = getRandom(0, items.length - 1);
      oneList.push(items[random]);
      items.splice(random, 1);
    }
    object["vocas-" + index] = oneList;
  });

  return object;
};

export default function Step4({ object, actionUpdate }) {
  const { setVoca, multiRemember } = object;
  const appVocas = useSelector((state) => state.vocas.list);
  const [isReady, setIsReady] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const dispatch = useDispatch();

  const randomData = () => {
    actionUpdate({
      ...object,
      multiRemember: getRandomObject([...appVocas]),
    });
  };

  React.useEffect(() => {
    dispatch(serviceFetVocaBySetId(setVoca.id, () => setIsReady(true)));
  }, []);

  React.useEffect(() => {
    if (isReady && appVocas.length > 0) randomData();
  }, [isReady]);

  return (
    <React.Fragment>
      <Typography
        variant="subtitle2"
        style={{ marginBottom: theme.spacing(1) }}
      >
        Những nhóm từ bên dưới đã được chọn ngẫu nhiên cho bạn
      </Typography>
      <Button color="primary" onClick={() => randomData()}>
        Random lại
      </Button>
      <Tabs
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        onChange={(event, newValue) => setActiveTab(newValue)}
      >
        {Object.keys(multiRemember).map((key, index) => (
          <Tab key={key} label={"Group " + (index + 1)} value={index} />
        ))}
      </Tabs>

      {Object.keys(multiRemember).map((key, index) => (
        <ListVocabularies
          hidden={index !== activeTab}
          vocas={multiRemember[key]}
          key={key}
        />
      ))}
    </React.Fragment>
  );
}
