const API_KEY = "43e3750f3cd6454c89b89a0ad7c06981";

let newsList = [];

const $menus = document.querySelectorAll(".menus button");
$menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

// For pagenation
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // &page를 위한
    url.searchParams.set("pageSize", pageSize); // &pageSize

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search.");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  getNews();
};

const getNewsByKeyword = async () => {
  const $keyword = document.getElementById("searchInput").value;
  url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${$keyword}&apiKey=${API_KEY}`);
  getNews();
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
        <a href="${news.url}">Go to News</a>
      </div>
    </div>
    <hr />
    `
    )
    .join("");

  document.getElementById("newsBoard").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `
    <div class="alert alert-danger" role="alert">
      ${errorMessage}
    </div>
  `;
  document.getElementById("newsBoard").innerHTML = errorHTML;
};

const paginationRender = () => {
  // totalResult
  // page
  // pageSize
  // groupSize (페이지 몇 개씩 보여줄지)

  // totalPages
  const totalPages = Math.ceil(totalResults / pageSize);

  // pageGroup (몇 번째 그룹에 속해있는지)
  // page / gruopSize 의 값을 올림해줘야 한다.
  const pageGroup = Math.ceil(page / groupSize);

  // lastPage
  // lastPage 그룹이 gropSize보다 작으면 -> lastPage = totalPage;
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  // firstPage
  const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNumber) => {
  console.log("move to page", pageNumber);
  page = pageNumber;
  getNews();
};

getLatestNews();
