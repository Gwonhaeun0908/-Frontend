const input = document.getElementById("input");     //할 일 입력창
const todolist = document.getElementById("todolist");   //할 일 리스트창
document.addEventListener('keydown', enter);            //'keydown'하면 'enter'함수 실행

function enter() {                                  //'enter'함수
    let list = document.createElement('li');        //html 'li' 태그 만들기
    if(window.event.keyCode === 13) {               //윈도우에 키코드가 13(엔터키)일때 실행
        if(!input.value)                            //할 일이 입력되지 않은 경우 alert 발생
            alert('내용을 입력해 주세요!');         
        else
        {   
            list.innerText = input.value;       //<il>입력된 할 일</li>
            todolist.appendChild(list);         //할 일 리스트창에 자식으로 붙이기
            input.value = "";                   //할 일 입력창 초기화
        }

        list.addEventListener('click', function() {     //만들어진 list에 클릭 이번트가 발생하면 줄 긋기
            list.style.textDecoration = "line-through";
        })
        list.addEventListener('dblclick', function() {  //만들어진 list에 더블클릭 이벤트가 발생하면 리스트에서 지우기
            todolist.removeChild(list);
        })
    }
}



