import React, { useEffect, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DiaryItem from "./DiaryItem";
const sortDateList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const sortFeelingList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "나쁜 감정" },
];
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <StyledControlMenu value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((item, idx) => (
        <option value={item.value} key={idx}>
          {item.name}
        </option>
      ))}
    </StyledControlMenu>
  );
});

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const feelingFilter = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const feelingFilteredList =
      filter === "all"
        ? copyList
        : copyList.filter((item) => feelingFilter(item));
    //diaryList에서 복사한 copyList의 item을 feelingFilter안에 한번 거르고 거기에 맞는 조건만 또 거른거네.
    const sortedList = feelingFilteredList.sort(compare);
    return sortedList;
  };

  return (
    <StyledDiaryList>
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortDateList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={sortFeelingList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </StyledDiaryList>
  );
}
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

const StyledDiaryList = styled.div`
  .menu_wrapper {
    margin: 20px 0 30px 0;
    display: flex;
    justify-content: space-between;
    .right_col {
      flex-grow: 1;
      button {
        width: 100%;
      }
    }
  }
`;

const StyledControlMenu = styled.select`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
`;
