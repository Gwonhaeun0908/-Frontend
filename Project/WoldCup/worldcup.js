const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");
const title = document.getElementById("title");

let count =0; 

let img = [
  ["images/0.png", 0],
  ["images/1.png", 0],
  ["images/2.png", 0],
  ["images/3.png", 0],
  ["images/4.png", 0],
  ["images/5.png", 0],
  ["images/6.png", 0],
  ["images/7.png", 0],
];

function shuffle(array) //숫자를 랜덤으로 돌려준다.
{  
    array.sort(() => Math.random() - 0.5);
  console.log(array);
}

shuffle(img); //새로고침 했을때 숫자를 랜덤으로 돌려준다.
    img1.src = img[1][0];
    img2.src = img[3][0];

function semifinal() 
{
    title.innerHTML = "준결승";
    console.log("준결승");
}

function final() 
{
    title.innerHTML = "결승";
    console.log("결승");
}

function delete_undefined(img) //선택되지 않은 숫자를 삭제한다.
{
    for(i in img)
    {
        if(img[i] == undefined)
            img.splice(i,1);
    }
}

img1.addEventListener("click", () => //왼쪽 이미지
{ 
    console.log("img1을 선택 하셨습니다.")
    shuffle(img);
    img1.src = img[1][0];
    img2.src = img[3][0];
    count += 1;
    compare(img1);
});

img2.addEventListener("click", () => //오른쪽 이미지
{ 
    console.log("img2을 선택 하셨습니다.")
    shuffle(img);
    img1.src = img[1][0];
    img2.src = img[3][0];
    count += 1;
    compare(img2);
});

// function compare(img)
// {
//     if(count >= 4){
//         if(fruit == img1 ){
//             if()
//         }
//     }
// }