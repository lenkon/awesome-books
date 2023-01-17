const bookCollection = document.getElementById('book-collection');
const formInput = document.getElementById('book-form');

let bookData = [];

const removeBook = (event) => {
  let id = event.target.id;
  let modBookData = bookData.filter(function(element, i) {
    return ((i != id) ? element : '');
  });
  bookData = modBookData;
  storeData();
  showSavedData();
}

const showSavedData = () => {
  if (localStorage.getItem('bookstoredata')) {
    bookData = JSON.parse(localStorage.getItem('bookstoredata'));
    
    let bookList = '';
    bookData.forEach((item, i) => {
      bookList += `
      <div>
        <div>${item.title}</div>
        <div>${item.author}</div>
        <div>
          <button type="submit" class="remove-button" id="${i}">Remove</button>
        </div>
        <hr>
      </div>
      `;
    });
    bookCollection.innerHTML = bookList;   
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((item) => item.addEventListener('click', removeBook));    
  }
};

function storeData() {
  const data =  JSON.stringify(bookData);
  localStorage.setItem('bookstoredata', data);
}

const addBookData = (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  bookData.push({
    title: title.value,
    author: author.value,
  });
  storeData();
  showSavedData();
  formInput.reset();
};

showSavedData();

formInput.addEventListener('submit', addBookData);
