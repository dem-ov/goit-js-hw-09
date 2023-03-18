const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
const DELAY = 1000;
refs.buttonStop.disabled = true;

refs.buttonStart.addEventListener('click', onStartClick);
refs.buttonStop.addEventListener('click', onStopClick);

function onStartClick() {
  timerId = setInterval(() => {
    changeBgColor();
  }, DELAY);
  onBtnDisabled();
}

function onStopClick() {
  clearInterval(timerId);
  onBtnDisabled();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function onBtnDisabled() {
  if (!refs.buttonStart.disabled) {
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
  } else {
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
  }
}
