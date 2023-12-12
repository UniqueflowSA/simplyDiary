import React from "react";
import styled from "styled-components";

function EmoitonItem({
  emotion_id,
  emotion_img,
  emotion_des,
  onClick,
  isSelectedEmo,
}) {
  return (
    <StyledEmotionItem
      onClick={() => onClick(emotion_id)}
      className={isSelectedEmo ? `emotion_on_${emotion_id}` : `emotion_off`}
    >
      <img src={emotion_img} alt="감정이미지" />
      <span>{emotion_des}</span>
    </StyledEmotionItem>
  );
}

export default React.memo(EmoitonItem);

const StyledEmotionItem = styled.div`
  cursor: pointer;
  border-radius: 5px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.emotion_off {
    background-color: #ececec;
  }
  &.emotion_on_1 {
    background-color: #64c964;
    color: white;
  }
  &.emotion_on_2 {
    background-color: #9dd772;
    color: white;
  }
  &.emotion_on_3 {
    background-color: #fdce17;
    color: white;
  }
  &.emotion_on_4 {
    background-color: #fd8446;
    color: white;
  }
  &.emotion_on_5 {
    background-color: #fd565f;
    color: white;
  }

  img {
    width: 50%;
    margin-bottom: 10px;
  }
  span {
    font-size: 15px;
  }
`;
