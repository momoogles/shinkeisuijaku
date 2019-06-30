import {
  GAME_STATE,
  JUDGE_STATE,
  GUIDE_STATE,
  SCORE,
  NODE,
  CARD_STATE,
  CARDS_NAME
} from "./constant.js";

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
  const div = document.createElement("div");
  const img_back = document.createElement("img");
  const img_front = document.createElement("img");

  img_back.setAttribute("src", "images/cards/card_back.png");

  img_front.setAttribute("src", `images/cards/card_${name}.png`);

  div.appendChild(img_back);
  div.addEventListener("click", () => {
    turnCard(key);
  });

  return {
    div: div,
    img_back: img_back,
    img_front: img_front
  };
};

const openCard = card_key => {
  const card_info = game_info.cards_info[card_key];

  card_info.element.div.replaceChild(
    card_info.element.img_front,
    card_info.element.img_back
  );

  card_info.state = CARD_STATE.FRONT;
};

const closeCard = (key1, key2) => {
  return new Promise(resolve => {
    const card_info1 = game_info.cards_info[key1];
    const card_info2 = game_info.cards_info[key2];

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
  console.log(game_info.cards_info[key1], game_info.cards_info[key2]);
  if (game_info.cards_info[key1].name === game_info.cards_info[key2].name) {
    return true;
  }
  return false;
};
//ここまではコールバック関数

const cards_name = shuffleCard(CARDS_NAME);

const game_info = {
  cards_info: cards_name.map((name, key) => ({
    element: makeCard(name, key),
    state: CARD_STATE.BACK,
    name: name
  })),

  judge_info: {
    card1_key: null,
    card2_key: null
  },

  state_info: GAME_STATE.SELECT_FIRST
};
console.log(game_info);

for (let i = 0; i < game_info.cards_info.length; i++) {
  NODE.APP.appendChild(game_info.cards_info[i].element.div);
}
//ここまでは初期処理

const turnCard = card_key => {
  switch (game_info.state_info) {
    case "SELECT_FIRST":
      openCard(card_key);
      game_info.judge_info.card1_key = card_key;

      NODE.GUIDE.textContent = GUIDE_STATE.SELECT_SECOND;
      game_info.state_info = GAME_STATE.SELECT_SECOND;
      break;

    case "SELECT_SECOND":
      if (game_info.cards_info[card_key].state === CARD_STATE.BACK) {
        openCard(card_key);
        game_info.judge_info.card2_key = card_key;
        game_info.state_info = GAME_STATE.JUDGE;

        switch (
          judgeCard(
            game_info.judge_info.card1_key,
            game_info.judge_info.card2_key
          )
        ) {
          case JUDGE_STATE.CORRECT:
            NODE.GUIDE.textContent = GUIDE_STATE.CORRECT;

            /*hideCard(
              game_info.judge_info.card1_key,
              game_info.judge_info.card2_key
            ).then(() => {
              const cards_state = game_info.cards_info.map(card => {
                return card.state;
              });
            break;*/
            break;

          case JUDGE_STATE.INCORRECT:
            NODE.GUIDE.textContent = GUIDE_STATE.INCORRECT;

            closeCard(
              game_info.judge_info.card1_key,
              game_info.judge_info.card2_key
            ).then(() => {
              NODE.GUIDE.textContent = GUIDE_STATE.SELECT_FIRST;
              game_info.state_info = GAME_STATE.SELECT_FIRST;
            });
            break;
        }
      }
      break;

    case "JUDGE":
      console.log("setTimeoutによる処理が行われるまでは次の処理は行われません");
      NODE.GUIDE.textContent = GUIDE_STATE.JUDGE;
      break;
  }
};
