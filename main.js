const accessKey = "pPVyhNVEE6VU9fdJJmloX7qwK0Re8Ir5F3bveOAYi3A";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  page = 1;
  searchImages();
});

// Add an event listener to handle the Enter key press in the search box
searchBox.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    page = 1;
    searchImages();
  }
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
