import { Box, Container, Toolbar } from "@material-ui/core";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
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
import { serviceGetProfile } from "../../service/userService";
export const withLayout = (Component, propsPages, isPrivatePage) => {
  return () => {
    // Variables:
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const _isLogined = useSelector(
      (state) => state.login && state.login.isLogined
    );
    const isFetchMyProfile = useRef(false);
    // Function defined:
    const getProfileDetail = () => {
      isFetchMyProfile.current = true;
      dispatch(serviceGetProfile());
    };
    const checkCallGetProfileAPI = () => {
      if (isFetchMyProfile.current || !isLogined()) return false;
      if (!user) return true;
      if (user && !user["expiredAt"]) return true;
      if (user && user["expiredAt"]) {
        if (user["expiredAt"] < Date.now()) {
          return true;
        }
      }
      return false;
    };
    // Life cycle hook:
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
    useEffect(() => {
      if (checkCallGetProfileAPI()) {
        getProfileDetail();
      }
    }, [_isLogined]);

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
          <Box py={2}>
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
