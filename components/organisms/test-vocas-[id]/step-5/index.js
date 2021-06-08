import React from "react";
import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import TitleBody from "components/atoms/title-body";

export default function TestGroupStep5({ results }) {
  return <React.Fragment>
    <BodyTop>
      <TitleBody>Kết quả kiểm tra của bạn</TitleBody>
      <h2>Results</h2>
    </BodyTop>
    <BodyTop>
      <TitleBody>Xem chi tiết</TitleBody>
      <BodyMaxWidth>
        <h2>Detail</h2>
      </BodyMaxWidth>
    </BodyTop>
  </React.Fragment>
}