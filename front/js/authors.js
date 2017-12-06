const authorURL = "https://agile-tundra-76451.herokuapp.com/authors/";

document.body.onload = start;

function start() {
    (function getDataAuthor() {
        fetch(authorURL)
            .then(function (response) {
                return response.json();
            }).then(function (authorData) {
                localStorage.setItem('authors', JSON.stringify(authorData))
            })
    })();

    var authinfo = JSON.parse(localStorage.getItem('authors'))

    for (let i = 0; i < authinfo.length; i++) {
        // let rotate = i
        $("#input").append(`
          <div class="mainload">
          <div><img src="${authinfo[i].portraitUrl}" class="bookcover"></div>
          <input type="image" src="./images/edit.png" name="edit" class="btTxt bookedit">
          <input type="image" onClick="book${authinfo[i].id}Delete()" src="./images/delete.png" name="delete" class="btTxt bookremove">
  
          <script type='text/javascript'>
          function book${authinfo[i].id}Delete() {
                      (function submitdata() {
                        $.ajax({
                            type:"DELETE",
                            url:"https://agile-tundra-76451.herokuapp.com/authors/${authinfo[i].id}",  
                        });
                        return alert('DELETED THAT BOOK QUICKER THAN TRUMP DELETES HIS TWEETS     :)'), (function() {   
                          location.reload();  
                      })();;
                    })();
                  };
                  </script>
  
          <div class="booktitle">${authinfo[i].authorFirstName} ${authinfo[i].authorLastName}</div>
          <p class="bookdescription">${authinfo[i].bio} </p>
          </div>`);
        $(".bookedit").click(function () {
            $("#input").replaceWith(`
            <h1 class="topic">Edit an existing Author!</h1><br><br>
            <div class='mainload'>
            <div>
                <div>
                    <form class="form" action="./js/editauthor.js" method="post">
                        <label for="authorFirstName">Author First Name</label><br>
                        <input type="text" name="authorFirstName" value="${authinfo[i].authorFirstName}" id="authorFirstName"><br>
                        <label for="authorLastName">Author Last Name</label><br>
                        <input type="text" name="authorLastName" value="${authinfo[i].authorLastName}" id="authorLastName"><br>
                        <label for="portraiturl">Portrait Image URL</label><br>
                        <input type="text" name="portraiturl" value="${authinfo[i].portraitUrl}" id="portraiturl"><br>
                        <label for="Biography">Biography</label><br>
                        <textarea name="Biography" value="${authinfo[i].bio}" id="Biography" cols="60" rows="5"></textarea><br>
                        
                        <input type="submit" value="Submit Changes" class="save bottombitch button">
                        <p class="save-status"></p>
                    </form>
                </div>
            </div>
        </div>`)
        });
        $(".addbookbutton").click(function () {
            $("#input").replaceWith(`
            <h1 class="topic">Add an Author!</h1><br>
            <div class="mainload">
        
                <form class="form" action="./addauthor.js" method="post">
                    <label for="authorFirstName">Author First Name</label><br>
                    <input type="text" name="authorFirstName" value="" id="authorFirstName" placeholder=" ... "><br>
                    <label for="authorLastName">Author Last Name</label><br>
                    <input type="text" name="authorLastName" value="" id="authorLastName" placeholder=" ... "><br>
                    <label for="portraitUrl">Portrait URL</label><br>
                    <input type="text" name="portraitUrl" value="" id="portraitUrl" placeholder=" ... "><br>
                    <label for="bio">Biography</label><br>
                    <textarea name="bio" value="" id="bio" cols="60" rows="5" placeholder="Enter biography ... "></textarea><br>
                    
                    <br><br>
                    <input type="submit" value="ADD AUTHOR" class="save bottombitch button">
                    <p class="save-status"></p>
                </form>
            </div>`)
            $('select.pincode').append($(`<option> ${authinfo[i].authorFirstName} ${authinfo[i].authorLastName} </option>`));
            $("#add").click(function () {
                const pushName = $(':selected').val();
                console.log(pushName)
                // $('select#list').attr('src', (data.find(y => y.title === pushName)));
                $('#list').append($(`<option>` + pushName + `</option>`));
            });
        });
        $(".resetpagebutton").click(function () {
            location.reload();
        });
    }
    $(".save").click(function (x) {
        x.preventDefault();
        $.post("https://agile-tundra-76451.herokuapp.com/authors", {
            authorFirstName: $("#authorFirstName").val(),
            authorLastName: $("#authorLastName").val(),
            bio: $("#Biography").val(),
            portraitUrl: $("#portraiturl").val()
        }, $('.save-status').text('Author Added!').fadeIn(200).show().delay(15000).fadeOut(500)).fail(function () {
            $('.save-status').text('Failure, please refresh and try again').fadeIn(200).show().delay(5000).fadeOut(500)
        })

    });
}