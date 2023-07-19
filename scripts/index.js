const circlesDecor = Array.from(document.querySelectorAll(".decor .circle"));
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

function animateCircle(circle) {
  let x = randInt(-180, 180);
  let y = randInt(-180, 180);

  anime({
    targets: circle,
    easing: "linear",
    duration: 3000,
    rotateX: x,
    rotateY: y,
    complete: function (anim) {
        animateCircle(circle)
    },
  });
}
circlesDecor.forEach(circle => {
    animateCircle(circle)
});

window.addEventListener("pointermove", cursorFollowing)
function cursorFollowing(ev) {
    setTimeout(() => {
        cursorFollower.style.left = ev.x - 15 + "px";
        cursorFollower.style.top = ev.y - 15 + "px";
    }, 50);
}