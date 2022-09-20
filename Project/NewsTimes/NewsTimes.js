let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");
let url;

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "rKMtkyXEHP4cODwLczm4TQKW4ohqBxbBq-313hdvipw",
    });
    url.searchParams.set('page', page);
    let response = await fetch(url, { headers: header });
    let data = await response.json();

    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      console.log("내가 받는 데이터",data);
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagenation();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
  }
};

const getLatesNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  getNews();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  //1.검색 키워드 읽어오기
  //2.url에 검색 키워드 부치기
  //3.헤더준비
  //4.url 부르기
  //5.데이터 가져오기
  //6.데이터 보여주기

  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  getNews();
};

const notImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";

const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
        <div class="col-lg-4">
      <img class="news-img-size" src="${item.media ? item.media : notImg}"/>  
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>
              ${item.summary == null || item.summary == "" 
              ? "내용없음" 
              : item.summary.length > 200 
              ? item.summary.substring(0, 200) + "..." 
              : item.summary}
            </p>
            <div>
                ${item.rights} ${item.published_date}
            </div>
            <div>
                ${news.rights}  
            </div>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
  ${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagenation = () => {
  let pagenationHTML = ``;
  //total_page
  //page
  //page group
  let pageGroup = Math.ceil(page / 5);
  //last
  let last = pageGroup * 5;
  //first
  let first = last - 4;
  //first ~ last 페이지 프린트

  pagenationHTML = ` <li class="page-item">
  <a class="page-link" href="#" aria-label="Previous" onclick = "moveToPage(${page - 1})>
    <span aria-hidden="true">&lt;</span>
  </a>
</li>`;

  for(let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item" ${page == i ? "active" : ""}>
    <a class="page-link" href="#" onclick = "moveToPage(${i})">${i}</a></li>`
  }

  pagenationHTML += ` <li class="page-item">
  <a class="page-link" href="#" onclick = "moveToPage(${page + 1}) aria-label="Next">
    <span aria-hidden="true">&gt;</span>
  </a>
</li>`;

  document.querySelector(".pagination").innerHTML =  pagenationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;

  getNews();
}

searchButton.addEventListener("click", getNewsByKeyword);
getLatesNews();

// const openNav = () => {
//   document.getElementById("mySidenav").style.width = "250px";
// };

// const closeNav = () => {
//   document.getElementById("mySidenav").style.width = "0";
// };
