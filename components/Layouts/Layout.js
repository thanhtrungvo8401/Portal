import { Box, Container, Toolbar } from "@material-ui/core";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCloseLoading } from "../../redux/actions/loadingActions";
import History from "../History";
import LoadingComponent from "../LoadingComponent";
import Navbar from "./Navbar";
import ToastComponent from "../Toast";
export const withLayout = (Component, propsPages) => {
  return () => {
    const dispatch = useDispatch();
    useEffect(() => {
      // close loading-component after page is loaded
      dispatch(actionCloseLoading());
    }, []);
    return (
      <React.Fragment>
        <Head>
          {Boolean(propsPages && propsPages.title) && (
            <title>{propsPages.title}</title>
          )}
        </Head>
        <Navbar />
        <Toolbar />
        <History />
        <LoadingComponent />
        <ToastComponent />
        <Container id="animation-navigate" className="animation-in">
          <Box my={2}>
            <Component />
          </Box>
        </Container>
      </React.Fragment>
    );
  };
};
