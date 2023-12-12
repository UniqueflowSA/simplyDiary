import styled from "styled-components";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { DiaryDispatchContext } from "../App";
function DiaryItem({ id, emotion, content, date }) {
  const { onRemove } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleString().slice(0, 13);

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  const handleRemove = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onRemove(id);
      console.log(id);
      alert("일기가 삭제되었습니다.");
      navigate("/", { replace: true });
    }
  };
  return (
    <StyledDiaryItem>
      <div
        onClick={goDetail}
        className={["emotion_img_wrapper", `emotion_img_${emotion}`].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `img/emotion${emotion}.png`}
          alt="감정이미지"
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate} </div>
        <div className="diary_content_preview">{content.slice(0, 20)} </div>
      </div>
      <div>
        <div className="btn_wrapper">
          <div>
            <MyButton onClick={goEdit} text={"수정하기"} />
          </div>
          <div>
            <MyButton
              onClick={handleRemove}
              text={"삭제하기"}
              type={"negative"}
            />
          </div>
        </div>
      </div>
    </StyledDiaryItem>
  );
}

export default React.memo(DiaryItem);

const StyledDiaryItem = styled.div`
  padding: 15px 0 15px 0;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;

  .emotion_img_wrapper {
    cursor: pointer;
    min-width: 120px;
    height: 80px;
    border-radius: 5px;
    display: flex;
    justify-content: center;

    img {
      width: 50%;
    }
  }
  .emotion_img_1 {
    background-color: #64c964;
  }
  .emotion_img_2 {
    background-color: #9dd772;
  }
  .emotion_img_3 {
    background-color: #fdce17;
  }
  .emotion_img_4 {
    background-color: #fd8446;
  }
  .emotion_img_5 {
    background-color: #fd565f;
  }

  .info_wrapper {
    flex-grow: 1;
    margin-left: 20px;
    cursor: pointer;

    .diary_date {
      font-weight: 600;
      font-size: 25px;
      margin-bottom: 5px;
    }
    .diary_content_preview {
      font-size: 18px;
    }
  }
  .btn_wrapper {
    min-width: 70px;
    div {
      margin: 5px 0;
    }
  }
`;
