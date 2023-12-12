import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DiaryDispatchContext } from "./../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import EmoitonItem from "./EmotionItem";
import { getStringDate, emotionList } from "../util/data";

function DiaryEditor({ isEdit, originData }) {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      onRemove(originData.id);
      alert("삭제되었습니다.");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  return (
    <StyledDiaryEditor>
      <MyHeader
        headText={isEdit ? "일기 수정" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              onClick={handleRemove}
              type={"negative"}
            />
          )
        }
      />
      <div>
        <section>
          <h4>날짜선택</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>감정점수</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((item) => (
              <EmoitonItem
                key={item.emotion_id}
                {...item}
                onClick={handleClickEmote}
                isSelectedEmo={item.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box_text_wrapper">
            <textarea
              placeholder="오늘은 어떤 하루였나요"
              name=""
              id=""
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </StyledDiaryEditor>
  );
}

export default DiaryEditor;

const StyledDiaryEditor = styled.div`
  section {
    margin-bottom: 40px;

    h4 {
      font-size: 22px;
      font-weight: bold;
    }
    .input_date {
      border: none;
      border-radius: 5px;
      background-color: #ececec;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 20px;
    }

    .emotion_list_wrapper {
      display: grid;
      grid-template-columns: repeat(5, auto);
      gap: 2%;
    }

    textarea {
      font-size: 20px;
      border-radius: 5px;
      box-sizing: border-box;
      width: 100%;
      min-height: 200px;
      resize: vertical;
      border: none;
      background-color: #ececec;
      padding: 20px;
    }

    .control_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
