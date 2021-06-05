import { BodyMaxWidth, BodyTop } from "components/atoms/body-wrapper";
import DividerItem from "components/atoms/devider-item";
import TitleBody from "components/atoms/title-body";
import TitleItem from "components/atoms/title-item";
// import ListExpandItem from "components/molecules/list-expand-items";

export default function ResultsTesting({ results }) {
  return <section>
    <BodyTop>
      <TitleBody>Kết quả kiểm tra</TitleBody>
      <BodyMaxWidth>
        <TitleItem>Tóm tắt kết quả</TitleItem>
        <h2>SUMMARY</h2>

        <DividerItem />

        <TitleItem>Kết quả chi tiết</TitleItem>
        <h2>DETAIL</h2>
      </BodyMaxWidth>
    </BodyTop>
  </section>
}
