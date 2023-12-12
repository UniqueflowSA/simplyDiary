import styled from "styled-components";

function MyHeader({ headText, leftChild, rightChild }) {
  return (
    <StyledHeader>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </StyledHeader>
  );
}

export default MyHeader;

const StyledHeader = styled.header`
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;

  div {
    display: flex;
  }
  .head_text {
    width: 50%;
    font-size: 25px;
    justify-content: center;
  }
  .head_btn_left {
    width: 25%;
    justify-content: start;
  }
  .head_btn_right {
    width: 25%;
    justify-content: end;
  }
`;
