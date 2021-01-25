import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionResetHistory } from "../redux/actions/historyActions";
function History(props) {
  const url = useSelector((state) => state.history);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (url) {
      dispatch(actionResetHistory());
      router.push(url);
    }
  }, [url]);
  return <></>;
}

export default History;
