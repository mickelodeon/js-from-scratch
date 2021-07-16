import '@styles/main.scss';
import '@img/background.jpg';
import '@img/siroko_isotipo.svg';
import '@img/siroko_logotipo.svg';
import '@img/arrow.svg';
import '@img/clock.svg';

import { printTexts } from '@partials/form-fields';
import { changeStep } from '@partials/quiz-steps';
import { startCountdown } from '@partials/countdown';

if (sessionStorage.getItem('quiz_step') == null) {
  sessionStorage.setItem('quiz_step', 'first');
}

printTexts(sessionStorage.getItem('quiz_step'));

if (sessionStorage.getItem('quiz_step') == 'third') {
  startCountdown();
}

document.querySelectorAll('.c-form__button')[0].addEventListener('click', event => {
  if(sessionStorage.getItem('quiz_step') !== 'third') {
    const value = document.querySelectorAll('.checked')[0].getElementsByTagName('input')[0].value;
    changeStep(sessionStorage.getItem('quiz_step'), value);
    printTexts(sessionStorage.getItem('quiz_step'));
  }else{
    window.open('https://www.siroko.com/', '_blank');
  }
});
