$(document).ready(function () {
  $.get("https://agile-tundra-76451.herokuapp.com/authors/", function (data) {
    for (var i = 0; i < data.length; i++) {
      // let rotate = i
      $("#input").append(`
        <div class="mainload">
        <div><img src="${data[i].portraitUrl}" class="bookcover"></div>
        <input type="image" src="./images/edit.png" name="edit" class="btTxt bookedit">
        <input type="image" onClick="book${data[i].id}Delete()" src="./images/delete.png" name="delete" class="btTxt bookremove">

        <script type='text/javascript'>
        function book${data[i].id}Delete() {
                    (function submitdata() {
                      $.ajax({
                          type:"DELETE",
                          url:"https://agile-tundra-76451.herokuapp.com/authors/${data[i].id}",  
                      });
                      return alert('DELETED THAT BOOK QUICKER THAN TRUMP DELETES HIS TWEETS     :)'), (function() {   
                        location.reload();  
                    })();;
                  })();
                };
                </script>

        <div class="booktitle">${data[i].authorFirstName} ${data[i].authorLastName}</div>
        <p class="bookdescription">${data[i].bio} </p>
        </div>`);
        $(".bookedit").click(function(data){
          $("#input").replaceWith(`
          <h1 class="topic">Edit an existing Author!</h1><br><br>
          <div class='mainload'>
          <div>
              <div>
                  <form class="form" action="./js/editbook.js" method="post">
                      <label for="booktitle">Book Title</label><br>
                      <input type="text" name="booktitle" value="" id="booktitle"><br>
                      <label for="genre">Genre</label><br>
                      <input type="text" name="genre" value="" id="genre"><br>
                      <label for="coverurl">Cover Image URL</label><br>
                      <input type="text" name="coverurl" value="" id="coverurl"><br>
                      <label for="description">Description</label><br>
                      <textarea name="description" value="" id="description" cols="60" rows="5"></textarea><br>
                      <label for="pairs">Authors</label></br>
                      <div class="form-section">
                          <div class="fleft">
                              <select id="list" multiple></select>
                          </div>
                          <div class="fright">
                              <button id="deleteButton" onclick="deleteEntry()">Delete</button>
                          </div>
                      </div>
  
                      <select name="pickauthor" class="pincode">
                  <option value="blank" disabled selected>Select an Author</option>
                </select>
                      <button id='add' type="button">Add</button>
                      <br><br>
                      <input type="submit" value="Submit Changes" class="save bottombitch button">
                      <p class="save-status"></p>
                  </form>
              </div>
          </div>
      </div>`)
        });
      // const findAuthor = data[i].id
      // const bookID = data[i].id
      // console.log(data)
      // console.log(bookID)
      // var authorID = (data.find(y => y.author_id === bookID))
      // console.log(authorID)
      //both
      // $.get("https://agile-tundra-76451.herokuapp.com/both/", function (data) {
      // var authorID = (data.find(y => y.id === findAuthor).author_id)
      // console.log(authorID)
      // $.get("https://agile-tundra-76451.herokuapp.com/authors/", function (data) {
      //   console.log(data[rotate].id, data[rotate].authorFirstName)
      //   console.log(data[rotate])
      //   if(data[rotate].id === authorID ){
      // $("#bookauthor").append(`${data[rotate].authorFirstName} ${data[rotate].authorFirstName} <br>`)
      // }
      // console.log(data[rotate].id, authorID)
      // $("#bookauthor").append(`${data[rotate].author_id}`)
      // });
      // });
    }
  });
});


// $.get("https://agile-tundra-76451.herokuapp.com/authors/", function (data) {
  //   for (var i = 0; i < data.length; i++) {
  //     // console.log(data)
  //     $("#bookauthor").append(`${data[i].authorFirstName} ${data[i].authorLastName}<br>`)
  //     // console.log(data.find(y => y.title === findTitle).img)
  //     // console.log(data[i].authorFirstName, data[i].authorLastName)
  //   }
  // });

  // const bookURL = "https://agile-tundra-76451.herokuapp.com/books/"

  // function getIDfromURL() {
  //   var id = location.search
  //   id = id.split('=')
  //   id = id[1]
  //   return id

  // }
  // console.log(data)





  // .then($.get(techURL + '/byId?id=' + getIDfromURL(), function(data2) {
  //   $("#category-name").append(data2[0]['category'])
  //   $("#description").append(data2[0]['description'])
  //   $("#tech-img").attr("src", "https://logo.clearbit.com/" + data2[0]['url'])
  // }).then($.get(techURL, function(data3) {
  //   console.log(data3)
  //   var arr = []
  //   for (var i = 0; i < data3.length; i++) {
  //     if (data3[i]['category'] === data3[getIDfromURL() - 1]['category']) {
  //       if (data3[i]['name'] !== data3[getIDfromURL() - 1]['name']) {
  //         arr.push(data3[i])
  //       }
  //     }
  //   }
  //   for (var i = 0; i < arr.length; i++) {
  //     $("#related-tech").append(`
  //           <div class="related">
  //             <a href="tech.html?id=${arr[i].id}">${arr[i].name}</a>
  //             <img src="https://logo.clearbit.com/${arr[i].url}">
  //           </div>
  //         `)
  //   }

  // })))
