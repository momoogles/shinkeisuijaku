let N = 0;
let num = 0;
let num1 = 0;
let num2 = 0;
let Baka = 0;
let A = "";
let B = "";
let C = "";
let D = "";
let E = 0;
let F = 0;
let x0 = 0;
let x1 = 0;
let x2 = 0;
let x3 = 0;
let x4 = 0;
let x5 = 0;
let x6 = 0;
let x7 = 0;
let x8 = 0;
let x9 = 0;
let y0 = 0;
let y1 = 0;
let y2 = 0;
let y3 = 0;
let y4 = 0;
let y5 = 0;
let y6 = 0;
let y7 = 0;
let y8 = 0;
let y9 = 0;
let arr1 = [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9];
let arr2 = [y0, y1, y2 ,y3, y4, y5, y6, y7, y8, y9];
console.log(arr1);

function turn1(N) {
    A = "images/card_back.png";
    if(Baka == 0) {
        num = N;
        if(N < 10) {
            num1 = N;
            B = `images/random/card_spade_${num1}.png`;
            C = `1card${num1}`;
            E = arr1[num]
            let card_src = [A, B];

            if(E == 1) {
                E = 0;
            }
            else {
                E ++;
            }
            document.getElementById(C).src = card_src[E]
            Baka ++;
        } else if(N >= 10) {
            num1 = N - 10;
            B = `images/random/card_spade_${num1}.png`;
            C = `2card${num1}`
            E = arr2[num1]
            let card_src = [A, B];
            if(E == 1) {
                E = 0;
            }
            else {
                E ++;
            }
            document.getElementById(C).src = card_src[E]
            Baka ++;
        }
    } else if(Baka == 1) {
        if(N == num) {
            ;
        } else {
            if(N <10) {
                num2 = N;
                B = `images/random/card_spade_${num2}.png`;
                D = `1card${num2}`
                F = arr1[num2]
                let card_src = [A, B];
                if(F == 1) {
                    F = 0;
                }
                else {
                    F ++;
                }
                document.getElementById(D).src = card_src[F]
                Baka ++;
            } else if(N >= 10) {
                num2 = N - 10;
                B = `images/random/card_spade_${num2}.png`;
                D = `2card${num2}`
                F = arr2[num2]
                let card_src = [A, B];
                if(F == 1) {
                    F = 0;
                }
                else {
                    F ++;
                }
                document.getElementById(D).src = card_src[F]
                Baka ++;
            }
        }
    } else if(Baka == 2) {
        if(num1 == num2) {
            console.log(true);
            document.getElementById(C).onclick = "";
            document.getElementById(D).onclick = "";
        } else {
            console.log(false);
            E = 0;
            F = 0;
            document.getElementById(C).src = A;
            document.getElementById(D).src = A;
        }
        Baka=0;
    }
}
