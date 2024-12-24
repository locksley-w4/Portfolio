const circlesDecor = Array.from(document.querySelectorAll(".decor-circle"));
const runnerElemsDecor = document.querySelector(".decor_2");
const cubeDecor = document.querySelector(".cube-decor");
const worksSection = document.querySelector("section.works_list");
const worksList = document.querySelector("ul.works_list");
const cursorFollower = document.querySelector(".cursor_follower");
// let circlesDecorAnim = anime({
//     targets: circlesDecor,
//     loop: true,
//     easing: "linear",
//     duration: 3000,
//     direction: "normal",
//     rotateX: `+=${randInt(0, 180)}`,
//     rotateY: `+=${randInt(0, 180)}`,
// });

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// (function () {
//   let x = randInt(-180, 180);
//   let y = randInt(-180, 180);
//   cursorFollower.cursorAnimation = anime({
//     targets: cursorFollower,
//     loop: true,
//     autoplay: false,
//     easing: "linear",
//     duration: 1000,
//     rotateX: x,
//     rotateY: y,
//     complete: function (anim) {
//       if (anim.duration < 300) anin.complete = null;
//       x = randInt(-180, 180);
//       y = randInt(-180, 180);
//       anim.duration -= 10;
//     },
//   });
// })();
function animateCircle(circle) {
  // let x = randInt(-180, 180);
  // let y = randInt(-180, 180);
  let x = randInt(-180, 180);
  let y = randInt(-180, 180);
  // let angle = randInt(-360, 360);
  circle.anime = anime({
    targets: circle,
    easing: "linear",
    duration: 1000,
    rotateX: x,
    rotateY: y,
    // loop: true
    complete: function (anim) {
      animateCircle(circle);
    },
  });
  // circle.style.backgroundImage = `background-image:(
  //   -${angle},
  //   rgba(255, 255, 220, 0.3) 0%,
  //   transparent 100%
  // );`;
  // circle.style.boxShadow = `box-shadow: 0 0 ${x}px ${y/(randInt(10,100)/10 )}px #00000023,`;
  // setTimeout(() => {
  //   animateCircle(circle);
  // }, 3000);
}
function getRandomRGBColor() {
  let red = randInt(0, 255);
  let green = randInt(0, 255);
  let blue = randInt(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
}
  // circlesDecor.forEach((circle) => {
  //   animateCircle(circle);
  // });

// window.addEventListener("pointermove", cursorFollowing);
// window.addEventListener("pointerdown", cursorShrinking);
// window.addEventListener("pointerup", cursorGrowing);
function cursorFollowing(ev) {
  // setTimeout(() => {
  cursorFollower.style.left = ev.x - 15 + "px";
  cursorFollower.style.top = ev.y - 15 + "px";
  // }, 50);
}
function cursorShrinking(ev) {
  // setTimeout(() => {
  //   cursorFollower.cursorAnimation.play();
  cursorFollower.style.left = ev.x - 7.5 + "px";
  cursorFollower.style.top = ev.y - 7.5 + "px";
  cursorFollower.style.width = 15 + "px";
  cursorFollower.style.height = 15 + "px";
  // }, 50);
}
function cursorGrowing(ev) {
  // setTimeout(() => {
  //   cursorFollower.cursorAnimation.pause();
  cursorFollower.style.left = ev.x - 15 + "px";
  cursorFollower.style.top = ev.y - 15 + "px";
  cursorFollower.style.width = 30 + "px";
  cursorFollower.style.height = 30 + "px";
  // }, 50);
}

function getRandomCoordinates(minX = 0, minY = 0, maxX, maxY) {
  let randX = randInt(minX, maxX);
  let randY = randInt(minY, maxY);
  let res = {
    x: randX,
    y: randY,
  };
  return res;
}

function animateRunnerElems() {
  let animationInterval = setInterval(() => {
    createRunningElem();
  }, 700);
}

animateRunnerElems(); // start animating runner elements

function createRunningElem(
  // width,
  // height,
  // color,
  animDurationMin = 2000,
  animDurationMax = 8000
) {
  let htmlElem = document.createElement("div");
  let width = randInt(10, 80);
  let height = width * (randInt(15, 30) / 100);
  let color = randInt(0, 1) === 0 ? "green" : "purple";
  let yCords = randInt(0, 95);
  let direction = randInt(0, 1) === 0 ? "left" : "right";
  let animDuration = randInt(animDurationMin, animDurationMax);

  htmlElem.style.width = width + "px";
  htmlElem.style.height = height + "px";
  htmlElem.classList.add("runnerElem", direction, color);
  htmlElem.style.top = yCords + "%";
  runnerElemsDecor.appendChild(htmlElem);
  if (direction === "left") moveToLeft(htmlElem, width, animDuration);
  if (direction === "right") moveToRight(htmlElem, width, animDuration);
  setTimeout(() => {
    htmlElem.remove();
  }, animDuration + 300);
}
function moveToLeft(elem, elemWidth, animDuration) {
  elem.style.left = "100vw";
  anime({
    targets: elem,
    duration: animDuration,
    easing: "linear",
    translateX: "-120vw",
  });
}
function moveToRight(elem, elemWidth, animDuration) {
  elem.style.left = -elemWidth + "px";
  // elem.style.transition = `${animDuration}ms linear all`;
  // // elem.style.left = window.visualViewport.width + elem.style.width;
  // elem.style.transform = `translateX(${window.visualViewport.width + elem.style.width}px)`
  anime({
    targets: elem,
    duration: animDuration,
    easing: "linear",
    translateX: "120vw",
  });
}

window.onload = () => {
  const rotatingTexts = Array.from(document.querySelectorAll(".rotating-text"));

  rotatingTexts.forEach((elem) => {
    let text = elem.innerHTML;
    let letters = text.split("");
    elem.innerHTML = "";
    for (let i = 0; i < letters.length; i++) {
      let span = document.createElement("span");
      span.innerHTML = letters[i];
      span.style.transform = `rotate(${10 * i}deg)`;
      elem.appendChild(span);
      console.log(span);
    }
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) worksSection.classList.add("active");
    else worksSection.classList.remove("active");
  });
});
observer.observe(worksList);
