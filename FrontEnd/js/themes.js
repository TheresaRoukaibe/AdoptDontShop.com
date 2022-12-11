let toggle_btn;
let big_wrapper;
const main = document.getElementById("main");
initiate();
let isDark = false;

function initiate(){
toggle_btn = document.getElementById("theme");
big_wrapper = document.getElementById("wrap");
}



function changeTheme(){
    isDark = !isDark;
    const clone = big_wrapper.cloneNode(true);
    main.appendChild(clone);
    if(isDark){
        clone.classList.remove("light");
        clone.classList.add("dark");

    }else{
        clone.classList.remove("dark");
        clone.classList.add("light");
    }
clone.classList.add("copy");
main.appendChild(clone);
document.body.classList.add("stop-scroll");
clone.addEventListener("animationend", ()=>{
    document.body.classList.remove("stop-scroll");
    big_wrapper.remove();
    clone.classList.remove("copy");
    initiate();
    events();
})
}

function events()
{
toggle_btn.addEventListener("click", changeTheme);
}

events();