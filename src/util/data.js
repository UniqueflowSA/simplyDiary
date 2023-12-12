export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/img/emotion1.png`,
    emotion_des: "넘모좋아",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/img/emotion2.png`,
    emotion_des: "좋아",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/img/emotion3.png`,
    emotion_des: "　",
  },

  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/img/emotion4.png`,
    emotion_des: "아",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/img/emotion5.png`,
    emotion_des: "으어어어어",
  },
];
