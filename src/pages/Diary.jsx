import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import styled from "styled-components";

import { getStringDate, emotionList } from "../util/data";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

function Diary() {
  const { id } = useParams();

  const [data, setData] = useState();
  const diaryList = useContext(DiaryStateContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (item) => parseInt(item.id) === parseInt(id)
      );
      console.log(targetDiary);
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다!");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <DiaryPage>로딩중.</DiaryPage>;
  } else {
    const curEmotionData = emotionList.find(
      (item) => parseInt(item.emotion_id) === parseInt(data.emotion)
    );

    return (
      <DiaryPage>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}`}
          leftChild={
            <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="" />
              <div className="emotion_des">{curEmotionData.emotion_des} </div>
            </div>
          </section>

          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p> {data.content}</p>
            </div>
          </section>
        </article>
      </DiaryPage>
    );
  }
}

export default Diary;

const DiaryPage = styled.div`
  section {
    width: 100%;
    margin: 50px 0 100px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .diary_img_wrapper {
    background-color: #ececec;
    width: 250px;
    height: 250px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  & .diary_img_1 {
    background-color: #64c964;
    color: #fff;
  }
  & .diary_img_2 {
    background-color: #9dd772;
    color: #fff;
  }
  & .diary_img_3 {
    background-color: #fdce17;
    color: #fff;
  }
  & .diary_img_4 {
    background-color: #fd8446;
    color: #fff;
  }
  & .diary_img_5 {
    background-color: #fd565f;
    color: #fff;
  }
  .emotion_des {
    font-size: 25px;
  }

  .diary_content_wrapper {
    width: 100%;
    background-color: #ececec;
    border-radius: 5px;
    word-break: keep-all;
    overflow-wrap: break-word;

    p {
      padding: 20px;
      text-align: left;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;
