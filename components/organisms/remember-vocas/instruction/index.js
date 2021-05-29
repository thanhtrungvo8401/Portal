import InstructionItemsGroup from "components/molecules/instruction-items-group";

const title = "Hướng dẫn";
const listInstructions = [
  {
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's unknown printer took a galley of type and scrambled it to make a type specimen book. \nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets of Lorem Ipsum.",
    textBold: "Lorem Ipsum",
    imageUrl: "https://gnv.id/wp-content/uploads/2021/02/Feb-Implementation-Instruction-on-Affixing-Proof-Stamp-for-Settlement-of-Underpaid-Stamp-Duty.jpg",
    alt: "step-01"
  },
  // {
  //   text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. \nAnd more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   textBold: "Lorem Ipsum",
  //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHftVtp-HnLv4AM9IzHCTcUaGvrvd8j62QlLCUUGXX8prdc8YkrcgNEguZ_Aw0aCSDesI&usqp=CAU",
  //   alt: "step-01"
  // }
]

export default function RememberVocasInstruction() {
  return <InstructionItemsGroup
    title={title}
    listInstructions={listInstructions}
  />
}