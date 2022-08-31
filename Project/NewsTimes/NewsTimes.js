let news = [];

const getLatesNews = async () => {
    let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=sport&page_size=10`);
    let header = new Headers({"x-api-key": "rKMtkyXEHP4cODwLczm4TQKW4ohqBxbBq-313hdvipw",});
    
    let response = await fetch(url, { headers: header});
    let data = await response.json();
    news = data.articles;
    console.log(news);

    render()
};

const render = () => {
    let newsHTML = ''   ;
    newsHTML = news.map((news) => {
        return `<div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" src="${news.media}"/>
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
                ${news.summary}
            </p>
            <div>
                ${news.rights} ${news.published_date}
            </div>
        </div>
    </div>`;
    }).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatesNews();