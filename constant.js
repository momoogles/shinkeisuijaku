export const GAME_STATE = {
  START: "START",
  SELECT_FIRST: "SELECT_FIRST",
  SELECT_SECOND: "SELECT_SECOND",
  JUDGE: "JUDGE",
  CLEAR: "CLEAR"
};

export const JUDGE_STATE = {
  CORRECT: true,
  INCORRECT: false
};

export const CARD_STATE = {
  FRONT: true,
  BACK: false
};

export const GUIDE_STATE = {
  START: "STARTをクリックしてください",
  SELECT_FIRST: "1枚目を選んでください",
  SELECT_SECOND: "2枚目を選んでください",
  CORRECT: "正解！",
  INCORRECT: "不正解！",
  CLEAR: "クリア！RESETをクリックしてください",
  JUDGE: "あなたはせっかちな人かプログラムの欠陥を見つけようとしてる人ですね！"
};

export const SCORE = {
  VALUE: 0
};

export const NODE = {
  APP: document.getElementById("app"),
  GUIDE: document.getElementById("guide")
};

export const CARDS_NAME = [
  "spade_0",
  "spade_0",
  "spade_1",
  "spade_1",
  "spade_2",
  "spade_2",
  "spade_3",
  "spade_3",
  "spade_4",
  "spade_4",
  "spade_5",
  "spade_5",
  "spade_6",
  "spade_6",
  "spade_7",
  "spade_7",
  "spade_8",
  "spade_8"
];
