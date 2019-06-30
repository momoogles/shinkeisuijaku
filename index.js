import {
  GAME_STATE,
  JUDGE_STATE,
  GUIDE_STATE,
  NODE,
  CARD_STATE,
  CARDS_NAME,
  BUTTON_STATE
} from "./constant.js";

//ここからコールバック関数

const shuffleCard = card_array => {
  let ary = [...card_array];

  for (let i = ary.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = ary[i];
    ary[i] = ary[r];
    ary[r] = tmp;
  } // Fisher-Yates shuffle

  return ary;
};

const makeCard = (name, key) => {
  const img_back = document.createElement("img");
  img_back.setAttribute("src", "images/cards/card_back.png");

  const img_front = document.createElement("img");
  img_front.setAttribute("src", `images/cards/card_${name}.png`);

  const div = document.createElement("div");
  div.appendChild(img_back);
  div.addEventListener("click", () => {
    turnCard(key);
  });

  return {
    img_back: img_back,
    img_front: img_front,
    div: div
  };
};

const openCard = card_key => {
  const card_info = g.game_info.cards_info[card_key];

  card_info.element.div.replaceChild(card_info.element.img_front, card_info.element.img_back);

  card_info.state = CARD_STATE.FRONT;
};

const closeCard = (key1, key2) => {
  return new Promise(resolve => {
    const card_info1 = g.game_info.cards_info[key1];
    const card_info2 = g.game_info.cards_info[key2];

    setTimeout(() => {
      card_info1.element.div.replaceChild(
        card_info1.element.img_back,
        card_info1.element.img_front
      );
      card_info2.element.div.replaceChild(
        card_info2.element.img_back,
        card_info2.element.img_front
      );

      card_info1.state = CARD_STATE.BACK;
      card_info2.state = CARD_STATE.BACK;
      resolve("成功しました");
    }, 1000);
  });
};

const judgeCard = (key1, key2) => {
  if (g.game_info.cards_info[key1].name === g.game_info.cards_info[key2].name) {
    return true;
  }
  return false;
};

const hideCard = (key1, key2) => {
  return new Promise(resolve => {
    setTimeout(() => {
      g.game_info.cards_info[key1].element.img_front.setAttribute(
        "style",
        "filter:brightness(50%)"
      );
      g.game_info.cards_info[key2].element.img_front.setAttribute(
        "style",
        "filter:brightness(50%)"
      );
      resolve("成功しました");
    }, 1000);
  });
};

//ここから初期処理

class Global_info {
  constructor() {
    this.cards_name = shuffleCard(CARDS_NAME);

    this.game_info = {
      cards_info: this.cards_name.map((name, key) => ({
        element: makeCard(name, key),
        state: CARD_STATE.BACK,
        name: name
      })),

      judge_info: {
        card1_key: null,
        card2_key: null
      },

      score: 0,

      restcards: this.cards_name.length,

      state_info: null
    };
  }
}

let g = new Global_info();

for (let i = 0; i < g.game_info.cards_info.length; i++) {
  NODE.APP.appendChild(g.game_info.cards_info[i].element.div);
}
NODE.APP.setAttribute("style", "filter: brightness(50%)");

NODE.GUIDE.textContent = GUIDE_STATE.START;

g.game_info.state_info = GAME_STATE.START;

NODE.BUTTON.textContent = BUTTON_STATE.START;
NODE.BUTTON.addEventListener("click", () => {
  startGame();
});

NODE.SDCORE.textContent = g.game_info.score;

//ここからクリック処理

const startGame = () => {
  NODE.APP.setAttribute("style", "filer: none");

  NODE.GUIDE.textContent = GUIDE_STATE.SELECT_FIRST;

  g.game_info.state_info = GAME_STATE.SELECT_FIRST;

  NODE.BUTTON.textContent = BUTTON_STATE.RESET;
  NODE.BUTTON.addEventListener("click", () => {
    resetGame();
  });
};

const turnCard = card_key => {
  switch (g.game_info.state_info) {
    case "START":
      break;

    case "SELECT_FIRST":
      openCard(card_key);
      g.game_info.judge_info.card1_key = card_key;

      NODE.GUIDE.textContent = GUIDE_STATE.SELECT_SECOND;
      g.game_info.state_info = GAME_STATE.SELECT_SECOND;
      break;

    case "SELECT_SECOND":
      if (g.game_info.cards_info[card_key].state === CARD_STATE.BACK) {
        openCard(card_key);
        g.game_info.judge_info.card2_key = card_key;
        g.game_info.state_info = GAME_STATE.JUDGE;

        switch (judgeCard(g.game_info.judge_info.card1_key, g.game_info.judge_info.card2_key)) {
          case JUDGE_STATE.CORRECT:
            g.game_info.score += 2;
            NODE.SDCORE.textContent = g.game_info.score;
            NODE.GUIDE.textContent = GUIDE_STATE.CORRECT;

            hideCard(g.game_info.judge_info.card1_key, g.game_info.judge_info.card2_key).then(
              () => {
                g.game_info.restcards -= 2;
                if (g.game_info.restcards === 0) {
                  NODE.GUIDE.textContent = GUIDE_STATE.CLEAR;
                  g.game_info.state_info = GAME_STATE.CLEAR;
                } else {
                  NODE.GUIDE.textContent = GUIDE_STATE.SELECT_FIRST;
                  g.game_info.state_info = GAME_STATE.SELECT_FIRST;
                }
              }
            );
            break;

          case JUDGE_STATE.INCORRECT:
            NODE.GUIDE.textContent = GUIDE_STATE.INCORRECT;

            closeCard(g.game_info.judge_info.card1_key, g.game_info.judge_info.card2_key).then(
              () => {
                NODE.GUIDE.textContent = GUIDE_STATE.SELECT_FIRST;
                g.game_info.state_info = GAME_STATE.SELECT_FIRST;
              }
            );
            break;
        }
      }
      break;

    case "JUDGE":
      console.log("setTimeoutによる処理が行われるまでは次の処理は行われません");
      NODE.GUIDE.textContent = GUIDE_STATE.JUDGE;
      break;

    case "CREAR":
      break;
  }
};

const resetGame = () => {
  if (g.game_info.state_info !== JUDGE) {
    for (let i = 0; i < g.game_info.cards_info.length; i++) {
      NODE.APP.removeChild(g.game_info.cards_info[i].element.div);
    }

    g = new Global_info();
    console.log(g);

    for (let i = 0; i < g.game_info.cards_info.length; i++) {
      NODE.APP.appendChild(g.game_info.cards_info[i].element.div);
    }

    NODE.GUIDE.textContent = GUIDE_STATE.SELECT_FIRST;

    g.game_info.state_info = GAME_STATE.SELECT_FIRST;

    NODE.SDCORE.textContent = g.game_info.score;
  }
};
