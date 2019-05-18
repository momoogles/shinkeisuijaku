let arr =[];

for(cnt = 0; cnt <= 17; cnt++){
    let img_info = {
    id: `1c${cnt}`,
    fn: `turn(cnt)`
    };
    arr.push(img_info);
} 

console.log(arr)