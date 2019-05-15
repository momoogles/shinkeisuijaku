let A, B, C, D;
let imgswich1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let imgswich2 = [0, 0, 0 ,0, 0, 0, 0, 0, 0];
let imgnum = imgswich1.length;

function start() {
    for (let cnt = 0; cnt <= (imgnum - 1); cnt ++) {
        A = `1card${cnt}`;
        B = `turn(${cnt})`;
        document.getElementById(A).onclick = new Function (`${B};`);
        C = `2card${cnt}`
        D = `turn(${cnt + imgnum})`
        document.getElementById(C).onclick = new Function (`${D};`);
    }
    document.getElementById("btn-main").onclick = new Function(";");
    document.getElementById("btn-main").textContent = "RESET";
}

let cf, chid1, chid2, num, num1, num2, f1, f2;
let flag = 0;
let cb = "images/card_back.png";

function turn(N) {
    if(flag == 0) {
        if(N < imgnum) {
            num = N;
            num1 = N;
            cf = `images/random/card_spade_${num1}.png`;
            chid1 = `1card${num1}`;
            f1 = imgswich1[num]
            card_src = [cb, cf];
            if(f1 == 1) {
                f1 = 0;
            }
            else {
                f1 ++;
            }
            document.getElementById(chid1).src = card_src[f1]
            flag ++;
        } else if(N >= imgnum) {
            num1 = N - imgnum;
            console.log(num1)
            cf = `images/random/card_spade_${num1}.png`;
            chid1 = `2card${num1}`
            f1 = imgswich2[num1]
            card_src = [cb, cf];
            if(f1 == 1) {
                f1 = 0;
            }
            else {
                f1 ++;
            }
            document.getElementById(chid1).src = card_src[f1]
            flag ++;
        }
    } else if(flag == 1) {
        if(N == num) {
            ;
        } else {
            if(N < imgnum) {
                num2 = N;
                cf = `images/random/card_spade_${num2}.png`;
                chid2 = `1card${num2}`
                f2 = imgswich1[num2]
                card_src = [cb, cf];
                if(f2 == 1) {
                    f2 = 0;
                }
                else {
                    f2 ++;
                }
                document.getElementById(chid2).src = card_src[f2]
                flag ++;
            } else if(N >= imgnum) {
                num2 = N - imgnum;
                cf = `images/random/card_spade_${num2}.png`;
                chid2 = `2card${num2}`
                f2 = imgswich2[num2]
                card_src = [cb, cf];
                if(f2 == 1) {
                    f2 = 0;
                }
                else {
                    f2 ++;
                }
                document.getElementById(chid2).src = card_src[f2]
                flag ++;
            }
        }
    } else if(flag == 2) {
        if(num1 == num2) {
            console.log(true);
            document.getElementById(chid1).onclick = new Function(";");
            document.getElementById(chid2).onclick = new Function(";");
        } else {
            console.log(false);
            f1 = 0;
            f2 = 0;
            document.getElementById(chid1).src = cb;
            document.getElementById(chid2).src = cb;
        }
        flag=0;
    }
}