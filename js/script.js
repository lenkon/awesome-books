const bookCollection = document.getElementById('book-collection');
const formInput = document.getElementById('book-form');

const bookData = [];

const showSavedData = () => {
  if (localStorage.getItem('bookstoredata')) {
    const bookData = JSON.parse(localStorage.getItem('bookstoredata'));
    
    let bookList = '';
    bookData.forEach((item, i) => {
      bookList += `<div>
      <div>${item.title}</div>
      <>${item.author}</div>
      <div>
        <button type="submit" class="remove-button" id="${i}">Remove</button>
      </div>
      <hr>
    </div>`;
    });
    bookCollection.innerHTML = bookList;   
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach((item) => item.addEventListener('click', removeBook));    
  }
};

showSavedData();

formInput.addEventListener('submit', addBookData);
