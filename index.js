import { GAME_STATE, JUDGE_STATE, GUIDE, SCORE, NODE } from "./constant.js"

const img_info = {
    front: ["images/card_spade_0.png", "images/card_spade_1.png", "images/card_spade_2.png", "images/card_spade_3.png", "images/card_spade_4.png", "images/card_spade_5.png", "images/card_spade_6.png", "images/card_spade_7.png", "images/card_spade_8.png"],
    back: "images/card_back.png",
}

const makeCard = () => {
    for(let i = 0; i < img_info.front.length * 2; i++) {
        const img_back = document.createElement("img");
        img_back.src = img_info.back;
        NODE.APP.appendChild(img_back);
    }
}

const shuffleImage = () => {
    for(let i in img_info.front) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = img_info.img_array[i];
        img_info.img_array[i] = img_info.img_array[r];
        img_info.img_array[r] = tmp;
    }
}

const resetSection = () => {
    makeCard();
    shuffleImage();
}

window.onload = resetSection();