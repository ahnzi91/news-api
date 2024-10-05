const API_KEY = "43e3750f3cd6454c89b89a0ad7c06981";

let news = [];

const getLatestNews = async () => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

  const response = await fetch(url);

  const data = await response.json();

  news = data.articles;
};

getLatestNews();
