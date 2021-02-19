import { Box, Container, Toolbar } from "@material-ui/core";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCloseLoading } from "../../redux/actions/loadingActions";
import History from "../History";
import LoadingComponent from "../LoadingComponent";
import Navbar from "./Navbar";
import ToastComponent from "../Toast";
import { NotLoginComponent } from "./PrivateLayout";
import { isLogined } from "../../utils/Helper";
import {
  actionSetIsLogined,
  actionShowLogin,
} from "../../redux/actions/loginActions";
export const withLayout = (Component, propsPages, isPrivatePage) => {
  return () => {
    const dispatch = useDispatch();
    const _isLogined = useSelector(
      (state) => state.login && state.login.isLogined
    );
    useEffect(() => {
      // close loading-component after page is loaded
      dispatch(actionCloseLoading());
      if (_isLogined !== isLogined()) {
        dispatch(actionSetIsLogined(isLogined()));
      }
      if (isPrivatePage && !isLogined()) {
        dispatch(actionShowLogin());
      }
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
            {isPrivatePage && !_isLogined ? (
              <NotLoginComponent />
            ) : (
              <Component />
            )}
          </Box>
        </Container>
      </React.Fragment>
    );
  };
};
