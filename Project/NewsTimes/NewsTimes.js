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
        console.log("A",data);
        page = 0;
        total_pages = 0;
        renderPagenation();
        throw new Error("검색된 결과값이 없습니다.");
      }
      console.log("B",data);
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagenation();
    } else {
      page = 0;
      total_pages = 0;
      pagenation();
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
    page = 0;
    total_pages = 0;
    Pagenation();
  }
};

const getLatesNews = async () => {
  page = 1; // 새로운거 search마다 1로 리셋
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`
  );
  getNews();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  page = 1;
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;
  page = 1;
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
          <img class="news-img-size" 
            src="${item.media ? item.media : notImg}"/>  
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
            <div>${news.rights || "no source"}  ${moment(
              news.published_date
            ).fromNow()}</div>
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
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  if(last > total_pages) {
    //마지막 그룹이 5개 이하이면
    last = total_pages;
  }
  let first = last - 4 <= 0 ? 1 : last - 4; //첫그룹이 5이하면
  if(first >= 6) {
    pagenationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="pageClick(${page - 1})">
                        <a class="page-link" href='#js-bottom'>&lt;</a>
                      </li>`;
  }

  for(let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${i == page ? "active" : ""}">
    <a class="page-link" href="#" onclick = "moveToPage(${i})">${i}</a></li>`
  }

  if(last < total_pages) {
    pagenationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
    <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
    </li>
    <li class="page-item" onclick="pageClick(${total_pages })">
    <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
    </li>`;
  }

  document.querySelector(".pagination").innerHTML =  pagenationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  window.scrollTo({ top: 0, behavior: 'smooth'});
  getNews();
}

searchButton.addEventListener("click", getNewsByKeyword);
getLatesNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
