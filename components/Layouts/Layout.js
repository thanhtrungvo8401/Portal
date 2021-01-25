import { Box, Container, Toolbar } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import History from "../History";
import LoadingComponent from "../LoadingComponent";
import Navbar from "./Navbar";
export const withLayout = (Component, propsPages) => {
  return () => {
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
        <Container id="animation-navigate" className="animation-in">
          <Box my={2}>
            <Component />
          </Box>
        </Container>
      </React.Fragment>
    );
  };
};
