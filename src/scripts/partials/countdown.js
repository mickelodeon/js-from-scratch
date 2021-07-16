import { printCountdownEnd } from './form-fields';

const startCountdown = () => {
  let startDate = '';
  let endDate = '';

  if(sessionStorage.getItem('quiz_startDate') == null && sessionStorage.getItem('quiz_endDate') == null) {
    startDate = new Date();
    startDate.setMinutes(startDate.getMinutes());
    endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 20);

    sessionStorage.setItem('quiz_startDate', startDate.getTime());
    sessionStorage.setItem('quiz_endDate', endDate.getTime());
  }

  setTimer();
};

const setTimer = () => {
  let x = setInterval(function() {
    const countdownDate = sessionStorage.getItem('quiz_endDate');
    const nowDate = new Date().getTime();
    const remainTime = countdownDate - nowDate;

    const minutes = Math.floor((remainTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainTime % (1000 * 60)) / 1000);

    document.querySelectorAll('.c-countdown__text')[0].innerHTML = minutes + ":" + seconds;

    if (remainTime < 0) {
      clearInterval(x);
      printCountdownEnd();
    }
  }, 1000);
};

export { startCountdown };