
// ! LIVE INPUT PREVALIDATION *************************************************

const numbersOnly = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

// * POSITIVE NUMBERS ONLY                                (class="nono")

document.querySelectorAll("input[type='text'].nono").forEach((item) => {
  item.addEventListener("keypress", function (e) {
    if (numbersOnly.includes(e.charCode) === false) {
      e.preventDefault();
    }
  });
});

// * MINUS / PERIOD / COMMA too                           (class="mipe")

document.querySelectorAll("input[type='text'].mipe").forEach((item) => {
  item.addEventListener("keypress", function (e) {
    let minusPeriod = [44, 45, 46];
    let numbersMinusPeriod = numbersOnly.concat(minusPeriod);
    if (numbersMinusPeriod.includes(e.charCode) === false) {
      e.preventDefault();
    }
  });
});

// * MINUS      minus only                                (class="monly")

document.querySelectorAll("input[type='text'].monly").forEach((item) => {
  item.addEventListener("keypress", function (e) {
    let minus = [45];
    let numbersMinus = numbersOnly.concat(minus);
    if (numbersMinus.includes(e.charCode) === false) {
      e.preventDefault();
    }
  });
});

// * PERIOD     period only                               (class="ponly")

document.querySelectorAll("input[type='text'].ponly").forEach((item) => {
  item.addEventListener("keypress", function (e) {
    let period = [44, 46];
    let numbersPeriod = numbersOnly.concat(period);
    if (numbersPeriod.includes(e.charCode) === false) {
      e.preventDefault();
    }
  });
});


// * DISABLES F5 REFRESH ACTION
// F12 = 123
window.addEventListener("keydown", keysPressed, false);
function keysPressed(e){
  if(e.keyCode === 116){
    e.preventDefault();
  }
}

// * DISABLES RIGHT CLICK

// document.addEventListener('contextmenu', event => event.preventDefault());
