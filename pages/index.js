import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { startClock } from "../redux/actions/actions";
import Examples from "../components/examples";
import Navbar from "../components/Layouts/Navbar";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startClock());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
    </>
  );
};

export default Index;
