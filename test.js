function check() {
    let element = document.getElementById('hoge_check');
    element.onclick = new Function("uncheck();");
}

function uncheck() {
    console.log ("a")
}