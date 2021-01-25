import { Box, Container, Toolbar } from "@material-ui/core";
import Head from "next/head";
import React from "react";
import History from "../History";
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
        <Container>
          <Box my={2}>
            <Component />
          </Box>
        </Container>
      </React.Fragment>
    );
  };
};
