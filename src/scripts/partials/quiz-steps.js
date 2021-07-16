import { generateCode } from './discount-code';
import { printTexts } from './form-fields';
import { startCountdown } from './countdown';

const changeStep = (currentStep, value) => {
  if (currentStep == 'first') {
    sessionStorage.setItem('quiz_step', 'second');
    sessionStorage.setItem('quiz_answer_1', value);
    printTexts('second');
  }else{
    if (currentStep == 'second') {
      sessionStorage.setItem('quiz_step', 'third');
      sessionStorage.setItem('quiz_answer_2', value);
      sessionStorage.setItem('quiz_code', generateCode());
      printTexts('third');
      startCountdown();
    }
  }
};

const resetStep = () => {
  sessionStorage.clear();
  sessionStorage.setItem('quiz_step', 'first');
  printTexts('first');
}

export { changeStep, resetStep };