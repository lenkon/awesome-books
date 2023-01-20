class Library {  
  constructor() {
    this.bookData = [];
    this.bookData = JSON.parse(localStorage.getItem('bookstoredata'));
    this.formInput = document.getElementById('book-form');
  }
    
  showSavedData () {
    if (this.bookData) {
      let bookList = '';
      if (this.bookData.length > 0) {
        bookList = '<div class="table-container">';        
      }
      else {
        bookList = '<div>';
      }

      bookList += '<table class="table table-hover table-sm table-striped"><tbody>';
      this.bookData.forEach((item, i) => {
        bookList += `        
        <tr>
          <td>"${item.title}" by ${item.author}</td>
          <td><button type="submit" class="remove-button" id="${i}">Remove</button></td>
        </tr>          
        `;
      });
      bookList += '</tbody></table></div>';
      const bookCollection = document.getElementById('book-collection');
      bookCollection.innerHTML = bookList;   
      const removeButtons = document.querySelectorAll('.remove-button');
      removeButtons.forEach((item) => item.addEventListener('click', this.removeBook.bind(this)));    
    }
  }

  addBookData(event) {
    event.preventDefault(); 
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    if (title.value.length > 0 && author.value.length > 0) {
      this.bookData.push({
        title: title.value,
        author: author.value,
      });
      this.storeData();
      this.showSavedData();
      this.formInput.reset();
    }    
  }

  storeData() {    
    localStorage.setItem('bookstoredata', JSON.stringify(this.bookData));
  }
  
  removeBook(event) {
    let id = event.target.id;
    let modBookData = this.bookData.filter(function(element, i) {
      return ((i != id) ? element : '');
    });
    this.bookData = modBookData;
    this.storeData();
    this.showSavedData();
  }
}

setInterval(function showDate() {
  const currentDateTime = new Date().toDateString();
  document.getElementById('date-time').innerHTML = `${currentDateTime} ${new Date().toLocaleTimeString('en-US')}`;
  setInterval(showDate, 5000);
}, 5000);

const menuItems = document.querySelectorAll('.menu-item');

function showContent() {
  const displayContent = this.getAttribute('link-name');  
  const contents = document.querySelectorAll('.toggle');
  contents.forEach((item) => {
    item.classList.add('show-none');
    document.getElementById(displayContent).classList.remove('show-none');
  });
}

document.getElementById('addbook').classList.add('show-none');
document.getElementById('contact').classList.add('show-none');

menuItems.forEach((menuItem) => menuItem.addEventListener('click', showContent));

const libraryData = new Library();

libraryData.showSavedData();

libraryData.formInput.addEventListener('submit', libraryData.addBookData.bind(libraryData));
