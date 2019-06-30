let A, B, C, D;
let idarr = [];
let imgarr = [];
let turnarr = [];
let imgswich1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let imgswich2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let imgnum = imgswich1.length;
let cback = "images/card_back.png";

function reset() {
  for (let group = 1; group <= 2; group++) {
    for (let cnt = 0; cnt < imgnum; cnt++) {
      A = `${group}card${cnt}`;
      document.getElementById(A).onclick = new Function(";");
      document.getElementById(A).src = cback;
      B = `${group}c${cnt}`;
      C = `images/random/card_spade_${cnt}.png`;
      idarr.push(B);
      imgarr.push(C);
    }
  }
  for (let cnt = 0; cnt < 2 * imgnum; cnt++) {
    D = `turn${cnt}`;
    turnarr.push(D);
  }
  shuffle(imgarr, idarr, turnarr);
  console.log(imgarr, idarr, turnarr);
  document.getElementById("btn-main").onclick = new Function("start();");
  document.getElementById("btn-main").textContent = "START";
  document.getElementById("guide").textContent = "STARTをClick!";
}

function shuffle(I, J, K) {
  for (var i = 2 * imgnum - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp1 = I[i];
    var tmp2 = J[i];
    var tmp3 = K[i];
    I[i] = I[r];
    J[i] = J[r];
    K[i] = K[r];
    I[r] = tmp1;
    J[r] = tmp2;
    K[r] = tmp3;
  }
}

function start() {
  for (let cnt = 0; cnt <= imgnum - 1; cnt++) {
    A = `1card${cnt}`;
    let imgElement1 = document.getElementById(A);
    imgElement1.id = idarr[cnt];
    document.getElementById(A).onclick = new Function(`${turnarr[cnt]};`);
    console.log(A, idarr[cnt]);
    B = `2card${cnt}`;
    let imgElement2 = document.getElementById(B);
    imgElement2.id = idarr[cnt + imgnum];
    document.getElementById(B).onclick = new Function(`${turnarr[cnt + imgnum]};`);
    console.log(B, idarr[cnt + imgnum]);
  }
  document.getElementById("btn-main").onclick = new Function("reset();");
  document.getElementById("btn-main").textContent = "RESET";
  document.getElementById("guide").textContent = "一枚目をClick!";
}

let cfront, chid1, chid2, doubletouch, judgenum1, judgenum2, f1, f2;
let check = 0;

function turn(N) {
  console.log(N);
  if (check == 0) {
    doubletouch = N;
    if (N < imgnum) {
      judgenum1 = N;
      cfront = imgarr[N];
      chid1 = `1c${judgenum1}`;
      f1 = imgswich1[judgenum1];
      card_src = [cback, cfront];
      if (f1 == 1) {
        f1 = 0;
      } else {
        f1++;
      }
      document.getElementById(chid1).src = card_src[f1];
      check++;
    } else if (N >= imgnum) {
      judgenum1 = N - imgnum;
      cfront = imgarr[N];
      chid1 = `2c${judgenum1}`;
      f1 = imgswich2[judgenum1];
      card_src = [cback, cfront];
      if (f1 == 1) {
        f1 = 0;
      } else {
        f1++;
      }
      document.getElementById(chid1).src = card_src[f1];
      check++;
    }
    document.getElementById("guide").textContent = "2枚目のカードをClick!";
  } else if (check == 1) {
    console.log(doubletouch, N);
    if (N == doubletouch) {
    } else {
      if (N < imgnum) {
        judgenum2 = N;
        cfront = imgarr[N];
        chid2 = `1c${judgenum2}`;
        f2 = imgswich1[judgenum2];
        card_src = [cback, cfront];
        if (f2 == 1) {
          f2 = 0;
        } else {
          f2++;
        }
        document.getElementById(chid2).src = card_src[f2];
        check++;
      } else if (N >= imgnum) {
        judgenum2 = N - imgnum;
        cfront = imgarr[N];
        chid2 = `2c${judgenum2}`;
        f2 = imgswich2[judgenum2];
        card_src = [cback, cfront];
        if (f2 == 1) {
          f2 = 0;
        } else {
          f2++;
        }
        document.getElementById(chid2).src = card_src[f2];
        check++;
      }
      if (judgenum1 == judgenum2) {
        document.getElementById("guide").textContent = "さすが！";
      } else {
        document.getElementById("guide").textContent = "残念無念再来年！";
      }
    }
  } else if (check == 2) {
    console.log(judgenum1, judgenum2);
    if (judgenum1 == judgenum2) {
      document.getElementById(chid1).onclick = new Function(";");
      document.getElementById(chid2).onclick = new Function(";");
    } else {
      f1 = 0;
      f2 = 0;
      document.getElementById(chid1).src = cback;
      document.getElementById(chid2).src = cback;
    }
    check = 0;
    document.getElementById("guide").textContent = "1枚目のカードをClick!";
  }
}
