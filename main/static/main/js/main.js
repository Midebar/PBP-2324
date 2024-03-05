function addBook() {
    fetch("{% url 'main:add_book_ajax' %}", {
        method: "POST",
        body: new FormData(document.querySelector('#form'))
    }).then(refreshBooks)

    document.getElementById("form").reset()
    return false
}

async function getBooks(url) {
    let url = "{% url 'main:show_json' %}"
    let djangourl = url
    const res = await fetch(djangourl)
    return await res.json()
}

async function refreshBooks() {
    document.getElementsByClassName("card-box").innerHTML = ""
    const books = await getBooks()
    console.log(books)
    let htmlString = ""
    books.forEach((book) => {
        htmlString += `
        <div class="card">
          <div class="card-content">
            <h3 class="card-title">Name: ${book.name}</h3> 
            <h3 class="card-page">Page: ${book.page}</h3>
            <h4>Date Added: ${book.date_added}</h4>
            <p class="card-description">Description: ${book.description}</p>
            <a href="{% url 'main:edit_book' book.pk %}">
              <button type="button" class="btn btn-primary">
                Edit
              </button>
            </a>
            <a href="{% url 'main:delete_book' book.pk %}">
              <button type="button" class="btn btn-danger">
                Delete
              </button>
            </a>
          </div>
        </div>` 
    })
    return htmlString
}