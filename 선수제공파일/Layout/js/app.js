/*app.js*/
const log = console.log;

window.addEventListener("load", () => {
    $(".slider>img:nth-child(1)").css({ 'left': '-100%' });
    $(".slider>img:nth-child(2)").css({ 'left': '0%' });
    $(".slider>img:nth-child(3)").css({ 'left': '100%' });
});

document.querySelector("html").style.scrollBehavior = "smooth";
let left = document.querySelector("#slider>div>div:nth-child(1)");
let right = document.querySelector("#slider>div>div:nth-child(3)");
left.innerHTML = "←";
right.innerHTML = "→";
$(left).css({ 'display': "flex", 'justifyContent': 'center', 'alignItems': 'center', 'fontSize': '28px', 'cursor': 'default' });
$(right).css({ 'display': "flex", 'justifyContent': 'center', 'alignItems': 'center', 'fontSize': '28px', 'cursor': 'default' });

let slide = document.querySelector("#slider>div>div:nth-child(2)");
$(slide).css({ 'display': 'flex', 'overflow': 'hidden', 'position': 'relative' });
slide.classList.add("slider");
slide.innerHTML =
    `<img src="images/slide3.jpg">
    <img src="images/slide1.jpg">
<img src="images/slide2.jpg">`;
$(".slider>img").css({ 'position': 'absolute', 'transition': '1.2s', 'z-index': '1' });

let time = 0;
left.addEventListener("click", () => {
    if (time == 0) {
        time = 1;
        let img1 = $(".slider>img:nth-child(1)");
        let img2 = $(".slider>img:nth-child(2)");
        let img3 = $(".slider>img:nth-child(3)");
        $(".slider>img").eq(2).prependTo(".slider");
        $(img1).css({ 'left': '0%' });
        $(img2).css({ 'left': '100%' });
        $(img3).css({ 'left': '-100%' });
        setTimeout(() => { time = 0 }, 1200);
    }
});

right.addEventListener("click", () => {
    if (time == 0) {
        time = 1;
        let img1 = $(".slider>img:nth-child(1)");
        let img2 = $(".slider>img:nth-child(2)");
        let img3 = $(".slider>img:nth-child(3)");
        $(".slider>img").eq(0).appendTo(".slider");
        $(img1).css({ 'left': '100%' });
        $(img2).css({ 'left': '-100%' });
        $(img3).css({ 'left': '0%' });
        setTimeout(() => { time = 0 }, 1200);
    }
});


let windowScroll = $(window).scrollTop();
window.addEventListener("scroll", () => {
    let y = window.scrollY;
    let inner = window.innerHeight;
    let wBottom = y + inner;
    let scroll = $(window).scrollTop();
    let mainHeight = $("nav").outerHeight(true) + $("#slider").outerHeight(true);
    let webHeight = $("#webdesign").outerHeight(true);
    let worldHeight = $("#worldskills").outerHeight(true);
    if (scroll > windowScroll) {
        if (y == mainHeight) {
            $("#webdesign>div>img").css({ transform: 'rotate(0deg)', transition: '1.5s' });
        } else if (y == (mainHeight + webHeight)) {
            $("#worldskills>div>img").css({ transform: 'rotate(10deg)', transition: '1.5s' });
        } else if (y >= (mainHeight + webHeight + worldHeight)) {
            $("#worldskills>div>img").css({ transform: 'rotate(-5deg)' });
        } else if (y >= (mainHeight + webHeight && wBottom <= mainHeight)) {
            $("#webdesign>div>img").css({ transform: 'rotate(10deg)' });
        }
    } else {
        if (wBottom <= mainHeight) {
            $("#webdesign>div>img").css({ transform: 'rotate(10deg)' });
        } else if (wBottom <= (mainHeight + webHeight)) {
            $("#worldskills>div>img").css({ transform: 'rotate(-5deg)' });
        }
    }
    windowScroll = scroll;
});

let webbtn = document.createElement("button");
webbtn.classList.add("webbtn");
webbtn.innerHTML = `read more`;
document.querySelector("#webdesign>div>.c").appendChild(webbtn);

webbtn.addEventListener("click", () => {
    $("#webdesign").css({ height: '900px', transition: '1s' });
    $("#webdesign .hidden-text").css({ width: '100%' });
    $("#webdesign .hidden-text").slideDown(1000);
});

let worldBtn = document.createElement("button");
worldBtn.classList.add("worldBtn");
worldBtn.innerHTML = `read more`;
document.querySelector("#worldskills>div>.c").appendChild(worldBtn);

worldBtn.addEventListener("click", () => {
    $("#worldskills").css({ height: '800px', transition: '1s' });
    $("#worldskills .hidden-text").css({ width: '100%' });
    $("#worldskills .hidden-text").slideDown(1000);
});

let popupCss = { width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, justifyContent: 'center', alignItems: 'center' }
let btnCss = { width: '30px', height: '30px', position: 'absolute', top: '10px', right: '10px' }
let imgs = document.querySelectorAll("#photos>div>div>p>img");
imgs.forEach(x => {
    x.addEventListener("mouseover", () => {
        $(x).css({ transition: '1s', transform: 'scale(0.8)' });
    });
    x.addEventListener("mouseout", () => {
        $(x).css({ transform: 'scale(1)' });
    });
    x.addEventListener("click", () => {
        let div = document.createElement("div");
        div.classList.add("bigImg");
        $(div).css(popupCss).css({ display: 'none' });
        div.innerHTML =
            `<div style="position: relative;">
            <img src="images/big_${$(x).attr("alt")}.jpg">
            <button id="removeBtn">X</button>
            </div>`;
        document.querySelector("body").appendChild(div);
        $(".bigImg").fadeIn(1000);
        $(div).css({ display: 'flex' });
        $("#removeBtn").css(btnCss);
        document.querySelector("#removeBtn").addEventListener("click", () => {
            $(".bigImg").fadeOut(1000, function() {
                this.remove();
            });
        });
    });
});

let i = 0;
let dataList = [];
let li = document.querySelectorAll("div>div>ul>li>ul>li");
li.forEach(x => {
    list = [x.getAttribute('data-country'), x.getAttribute('data-photo'), x.getAttribute('title')];
    dataList.push(list);
    let text = x.innerHTML;
    x.innerHTML = "";
    x.innerHTML = `<span>${text}</span>`;
    i++;
});

let span = document.querySelectorAll("div>div>ul>li>ul>li>span");
span.forEach(x => {
    x.addEventListener("click", () => {
        let city = x.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("h2").innerHTML;
        let lis = x.parentElement;
        let dom = document.createElement("div");
        dom.innerHTML =
            `<p>${city}</p>
        <p>이름 : ${x.innerHTML}</p>
        <p>국가 : ${lis.getAttribute('data-country')}</p>
        <p>${lis.getAttribute('title')}</p>
        <img src="images/${lis.getAttribute('data-photo')}">`;
        $(dom).dialog({
            modal: true
        });
    });
});