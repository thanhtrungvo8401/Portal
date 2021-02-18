import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constantApp } from "../utils/Constant";
import { actionResetHistory } from "../redux/actions/historyActions";
import { actionSetLoading } from "../redux/actions/loadingActions";
import { actionCloseLogin } from "../redux/actions/loginActions";
function History(props) {
  const url = useSelector((state) => state.history);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBeforeNavigate = (url) => {
    const element = document.getElementById("animation-navigate");
    dispatch(actionCloseLogin());
    if (element && router.pathname !== url) {
      element.classList.add(["animation-out"]);
      element.classList.remove(["animation-in"]);
      setTimeout(() => {
        dispatch(actionSetLoading());
        router.push(url);
      }, constantApp.animationTime * 1000);
    }
  };
  useEffect(() => {
    if (url) {
      dispatch(actionResetHistory());
      handleBeforeNavigate(url);
    }
  }, [url]);
  return <></>;
}

export default History;
