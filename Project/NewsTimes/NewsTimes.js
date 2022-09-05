let news = [];
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) => menu.addEventListener("click",(event) => getNewsByTopic(event)));

const getLatesNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let header = new Headers({"x-api-key": "rKMtkyXEHP4cODwLczm4TQKW4ohqBxbBq-313hdvipw",});
    
    let response = await fetch(url, { headers: header});
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render()
};

const getNewsByTopic = (event) => {

}

const render = () => {
    let newsHTML = ''   ;
    newsHTML = news.map((item) => {
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${item.media}"/>
        </div>
        <div class="col-lg-8">
            <h2>${item.title}</h2>
            <p>
                ${item.summary}
            </p>
            <div>
                ${item.rights} ${item.published_date}
            </div>
        </div>
    </div>`;
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatesNews();

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if(inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};