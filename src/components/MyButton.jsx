import styled from "styled-components";

function MyButton({ text, type, onClick }) {
  const btnType = ["positive", "negative"].includes(type) ? type : "defalut";

  return (
    <StyledBtn
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </StyledBtn>
  );
}

MyButton.defalutProps = {
  type: "defalut",
};

export default MyButton;

const StyledBtn = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  white-space: nowrap;
  font-weight: 500;
`;
