import Texts from '@jsons/texts.json';
import { resetStep } from '@partials/quiz-steps';

const stepName = document.querySelectorAll('.c-header__step')[0];
const stepTitle = document.querySelectorAll('.c-header__title')[0];
const stepDescription = document.querySelectorAll('.c-header__description')[0];
const formTitle = document.querySelectorAll('.c-form__title')[0];
const formList = document.querySelectorAll('.c-form__list')[0];
const formButton = document.querySelectorAll('.c-form__button--text')[0];

const printTexts = (currentStep) => {
  stepName.innerHTML = Texts.steps.[currentStep].step_name;
  stepTitle.innerHTML = Texts.steps.[currentStep].step_title;
  stepDescription.innerHTML = Texts.steps.[currentStep].step_description;
  formTitle.innerHTML = Texts.steps.[currentStep].form_title;
  formButton.innerHTML = Texts.steps.[currentStep].form_button;

  if (currentStep == 'first' || currentStep == 'second') {
    printOptions(currentStep);
  }else{
    printCode();
    document.querySelectorAll('.c-form__instructions')[0].innerHTML = Texts.steps.[currentStep].form_instructions;
  }
};

const printOptions = (currentStep) => {
  const options = Texts.steps.[currentStep].form_options;
  let htmlList = '';
  let count = 0;

  Object.keys(options).forEach(key => {
    if (count == 0) {
      htmlList += '<div class="o-box c-form__list--option checked"><input type="radio" name="year" value="'+options[key]+'"><label for="year">'+options[key]+'</label></div>';
    }else{
      htmlList += '<div class="o-box c-form__list--option"><input type="radio" name="year" value="'+options[key]+'"><label for="year">'+options[key]+'</label></div>';
    }

    count++;
  });

  formList.innerHTML = htmlList;

  document.querySelectorAll('.c-form__list--option').forEach(item => {
    item.addEventListener('click', event => {
      selectOption(item);
    });
  });
};

const printCode = () => {
  const code = sessionStorage.getItem('quiz_code');
  document.querySelectorAll('.c-form__list--option').forEach(elem => {
    elem.style.display = 'none';
  });
  let htmlCode = '<div class="o-box c-form__code"><input class="c-form__code--text" type="text" value="'+code+'" readonly></input><button class="c-form__code--button">Copiar</button></div>';
  htmlCode += '<p class="c-form__instructions"></p>';
  htmlCode += '<div class="o-box c-countdown"><img class="c-countdown__icon" src="./img/clock.svg" alt="Countdowm"/><span class="c-countdown__text"></span></div>';
  formList.innerHTML = htmlCode;

  document.querySelectorAll('.c-form__code--button')[0].addEventListener('click', event => {
    document.querySelectorAll('.c-form__code--text')[0].select();
    document.querySelectorAll('.c-form__code--text')[0].setSelectionRange(0, 99999);
    document.execCommand("copy");
  });
};

const printCountdownEnd = () => {
  document.querySelectorAll('.c-countdown')[0].classList.add("finished");
  document.querySelectorAll('.c-countdown__text')[0].innerHTML = Texts.steps.third.form_restart;

  document.querySelectorAll('.c-countdown')[0].addEventListener('click', event => {
    resetStep();
  });
};

const selectOption = (elem) => {
  document.querySelectorAll('.checked')[0].classList.remove("checked");
  elem.classList.add("checked");
};

export { printTexts, printCode, printCountdownEnd };