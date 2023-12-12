import React, { useEffect, useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import styled from "styled-components";

import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import New from "./pages/New";
//COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  //dispatch
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <GlobalStyle />
          <StyledApp className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>

            <footer></footer>
          </StyledApp>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

const StyledApp = styled.div`
  padding: 20px;
  height: 60vw;
  /** Button style */
  .MyButton_positive {
    background-color: #64c964;
    color: #fff;
  }
  .MyButton_negative {
    background-color: #fd565f;
    color: #fff;
  }
  .MyButton_default {
    background-color: #ececec;
  }
`;

export default App;
