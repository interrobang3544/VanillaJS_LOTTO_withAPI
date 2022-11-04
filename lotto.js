const form = document.querySelector(".form"),
  input = form.querySelector("input"),
  userInput = document.querySelector(".user-input");
 
function askForNum() {
  form.addEventListener("submit", handleSubmit)
}

function handleSubmit(event) {
    event.preventDefault();
    paintInput(input.value);
    fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${input.value}`)
    .then((result) => result.json())
    .then((data) => generateBalls(data));
}
  
function paintInput(text){
  userInput.classList.remove('hide');
  form.classList.add('hide');
  userInput.innerText = `${text}회차가 조회됩니다.
  *다시 하시려면 새로고침 해주세요.`

}

askForNum();


const contents = document.getElementById('contents');


function generateBalls(data) {
  let newDiv = document.createElement('div');

  newDiv.className = `result`;
  newDiv.id = `result`;
  contents.appendChild(newDiv);


  let picked = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4,data.drwtNo5, data.drwtNo6]
    .sort()

  function painting(number, resultN) {
    let ball = document.createElement('div');
    
    ball.className = 'ball';
    ball.textContent = number;

    let ballColor;
    if (number <= 10) {
      ballColor = 'rgb(251,196,0)';
    } else if (number <= 20) {
      ballColor = 'rgb(105,200,242)';
    } else if (number <= 30) {
      ballColor = 'rgb(255,121,121)';
    } else if (number <= 40) {
      ballColor = 'rgb(164,164,164)';
    } else {
      ballColor = 'rgb(176,216,64)';
    }
    ball.style.background = ballColor;
    
    resultN.appendChild(ball);
  }
  
  function texting(addText, resultN) {
    let textBonus = document.createElement('div');
    textBonus.textContent = addText;
    textBonus.className = 'textBonus';
    resultN.appendChild(textBonus);
  }

  for (let j = 0; j < picked.length; j++) {
    setTimeout(() => {
      painting(picked[j], newDiv);
    }, (j) * 100);
  }

  setTimeout(() => {
    texting('+', newDiv);
    }, 800);

  setTimeout(() => {
    painting(data.bnusNo, newDiv);
  }, 900);
  

}
