//랜덤번호 지정
//유저가 번호를 입력, 그리고 go버튼을 누른다
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다
//랜덤번호가 < 유저번호 Down
//랜덤번호가 > 유저번호 up
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답",computerNum);
}

function play() {
    let userValue = userInput.value

    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100사이의 숫자를 입력해주세요.";
        return;
    }

    chances --;
    chanceArea.textContent = `남은기회:${chances}번`
    console.log("chance", chances);

    if(userValue < computerNum) {
        resultArea.textContent = "Up";
    } else if(userValue > computerNum) {
        resultArea.textContent = "Down";
    } else {
        resultArea.textContent = "정답입니다.";
    }
    if(chances < 1) {
        gameOver = true;
    }

    if(gameOver == true) {
        playButton.disabled = true;
    }
}

function reset() {
    //user input창 정리
    userInput.value = "";
    //새로운 숫자 생성
    pickRandomNum();
}
pickRandomNum();