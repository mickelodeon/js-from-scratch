const generateCode = () => {
  let number = sessionStorage.getItem('quiz_answer_1').slice(-2);
  let total = 0;

  while (number) {
      total += number % 10;
      number = Math.floor(number / 10);
  }

  const word = sessionStorage.getItem('quiz_answer_2').replaceAll('a','').replaceAll('A','').replaceAll(' ','').slice(-4);

  return total.toString().concat(word);
};

export { generateCode };