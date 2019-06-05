import "./styles.css";

const LIST = `
<div class="list">
<h2>{name}</h2>
{books}
</div>
`;
const BOOK = `
<div class="book">
<img src="{image}" />
<h3>{title} by {author}</h3>
<a class="button" href="{link}">More info</a>
</div>
`;
const date = new Date().toISOString().split("T")[0];
const result = fetch(
  `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=FOC1KXjCopK9GPeevNa7CMMdg8CesvYI`
);
result.then(response => {
  return response.json().then(json => {
    const allMarkup = json.results.lists
      .map(list => {
        let markup = LIST.replace("{name}", list.display_name);
        const bookMarkup = list.books
          .map(book => {
            return BOOK.replace("{title}", book.title)
              .replace("{image}", book.book_image)
              .replace("{author}", book.author)
              .replace("{link}", book.amazon_product_url);
          })
          .join("");
        return markup.replace("{books}", bookMarkup);
      })
      .join("");
    const container = document.createElement("div");
    container.innerHTML = "<h1>New York Times Bestsellers</h1>" + allMarkup;
    container.className = "container";
    document.body.appendChild(container);
  });
});

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use Parcel to bundle this sandbox, you can find more info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;
