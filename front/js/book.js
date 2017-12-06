const bookURL = "https://agile-tundra-76451.herokuapp.com/books/";
const authorURL = "https://agile-tundra-76451.herokuapp.com/authors/";
const bothURL = "https://agile-tundra-76451.herokuapp.com/both/";

document.body.onload = start;

function start() {

    (function getDataBooks() {
        fetch(bookURL)
            .then(function (response) {
                return response.json();
            }).then(function (booksData) {
                localStorage.setItem('books', JSON.stringify(booksData))
            })
    })();

    (function getDataAuthor() {
        fetch(authorURL)
            .then(function (response) {
                return response.json();
            }).then(function (authorData) {
                localStorage.setItem('authors', JSON.stringify(authorData))
            })
    })();

    (function getDataBoth() {
        fetch(bothURL)
            .then(function (response) {
                return response.json();
            }).then(function (bothData) {
                localStorage.setItem('both', JSON.stringify(bothData))
            })
    })();

    var bookinfo = JSON.parse(localStorage.getItem('books'))
    var authinfo = JSON.parse(localStorage.getItem('authors'))
    var bothinfo = JSON.parse(localStorage.getItem('both'))

    for (let i = 0; i < bookinfo.length; i++) {
        let pushName = 0;
        $("#input").append(`
        <div class="mainload">
        <div><img src="${bookinfo[i].coverUrl}" class="bookcover"></div>
        <input type="image" src="./images/edit.png" name="edit" class="btTxt bookedit">
        <input type="image" onClick="book${bookinfo[i].id}Delete()" src="./images/delete.png" name="delete" class="btTxt bookremove">

        <script type='text/javascript'>
        function book${bookinfo[i].id}Delete() {
                    (function submitdata() {
                      $.ajax({
                          type:"DELETE",
                          url:"https://agile-tundra-76451.herokuapp.com/books/${bookinfo[i].id}",  
                      });
                      return alert('DELETED THAT BOOK QUICKER THAN TRUMP DELETES HIS TWEETS     :)'), (function() {   
                        location.reload();  
                    })();;
                  })();
                };</script>
                
        <div class="booktitle">${bookinfo[i].title} </div>
        <div id="bookauthor"></div>
        <div id="bookgenre">Genre: <strong>${bookinfo[i].genre}</strong></div>
        <p class="bookdescription">${bookinfo[i].description} </p>
        </div>`);
        $(".bookedit").click(function () {
            $("#input").replaceWith(`
        <h1 class="topic">Edit an existing book!</h1><br><br>
        <div class='mainload'>
        <div>
            <div>
                <form class="form" action="./js/editbook.js" method="post">
                    <label for="booktitle">Book Title</label><br>
                    <input type="text" name="booktitle" value="${bookinfo[i].title}" id="booktitle"><br>
                    <label for="genre">Genre</label><br>
                    <input type="text" name="genre" value="${bookinfo[i].genre}" id="genre"><br>
                    <label for="coverurl">Cover Image URL</label><br>
                    <input type="text" name="coverurl" value="${bookinfo[i].coverUrl}" id="coverurl"><br>
                    <label for="description">Description</label><br>
                    <textarea name="description" value="" id="description" cols="60" rows="5">${bookinfo[i].description}</textarea><br>
                    <br>
                    <input type="submit" value="Submit Changes" class="save bottombitch button">
                    <p class="save-status"></p>
                </form>
            </div>
        </div>
    </div>`)
        });
        $(".addbookbutton").click(function () {
            $("#input").replaceWith(`
            <h1 class="topic"><strong>Add your favorite book!</strong></h1><br>
            <div class="mainload">
                <div>
                    <div>
                        <form class="form" action="./book.js" method="post">
                            <label for="booktitle">Book Title</label><br>
                            <input type="text" name="booktitle" value="" id="booktitle" placeholder=" ... "><br>
                            <label for="genre">Genre</label><br>
                            <input type="text" name="genre" value="" id="genre" placeholder=" ... "><br>
                            <label for="coverurl">Cover Image URL</label><br>
                            <input type="text" name="coverurl" value="" id="coverurl" placeholder=" ... "><br>
                            <label for="description">Description</label><br>
                            <textarea name="description" value="" id="description" cols="60" rows="5" placeholder="Enter description ... "></textarea><br>
                            <input type="submit" value="Submit this book" class="save bottombitch button">
                            <p class="save-status"></p>
                        </form>
                    </div>
                </div>
            </div>`)
            $('select.pincode').append($(`<option> ${authinfo[i].authorFirstName} ${authinfo[i].authorLastName} </option>`));
            
        });
        $(".resetpagebutton").click(function () {
            location.reload();
        });
    }
    $('body').on('click', "#add", function () {
        const pushName = $(':selected').val();
        console.log(pushName)
        $('#list').append($(`<option>` + pushName + `</option>`));
    });
    $(".save").click(function (x) {
        x.preventDefault();
        $.post("https://agile-tundra-76451.herokuapp.com/books", {
            title: $("#booktitle").val(),
            genre: $("#genre").val(),
            description: $("#description").val(),
            coverUrl: $("#coverurl").val()
        }, $('.save-status').text('Book Added!').fadeIn(200).show().delay(15000).fadeOut(500))
        .fail(function () {
            $('.save-status').text('Failure, please refresh and try again').fadeIn(200).show().delay(5000).fadeOut(500)
        })

    });
}