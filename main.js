const API_KEY = "43e3750f3cd6454c89b89a0ad7c06981";

let newsList = [];

const $menus = document.querySelectorAll(".menus button");
console.log($menus);
$menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const getLatestNews = async () => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

  const response = await fetch(url);

  const data = await response.json();

  newsList = data.articles;
  render();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category : ", category);
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();
};

const render = () => {
  // map() : 배열의 리스트들을 들고 온다.
  // 리턴값 : Array
  const newsHTML = newsList
    .map(
      (news) =>
        `
    <div class="row news">
      <div class="col-lg-4">
        <img class="news-img" src="${news.urlToImage}" />
      </div>
      <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        <div>${news.source.name} * ${news.publishedAt}</div>
      </div>
    </div>
    `
    )
    .join("");

  document.getElementById("newsBoard").innerHTML = newsHTML;
};

getLatestNews();
