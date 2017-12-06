$(document).ready(function() {
    $.get("https://agile-tundra-76451.herokuapp.com/books", function(data) {
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            $('select.pincode').append($(`<option> ${data[i].authorFirstName} ${data[i].authorLastName} </option>`));
            $(".pincode").on("change", function() {
                const pushName = $(':selected').val();
                console.log(pushName)
                // $('select#list').attr('src', (data.find(y => y.title === pushName)));
                $('#list').append($(`<option>` + pushName + `</option>`));
            });
        };
        
    });
    $(".save").click(function(x) {
        x.preventDefault();
        $.post("https://agile-tundra-76451.herokuapp.com/books", {
            title: $("#booktitle").val(),
            genre: $("#genre").val(),
            description: $("#description").val(),
            coverUrl: $("#coverurl").val()
        }, $('.save-status').text('Book Added!').fadeIn(200).show().delay(15000).fadeOut(500)).fail(function() {
            $('.save-status').text('Failure, please refresh and try again').fadeIn(200).show().delay(5000).fadeOut(500)
        })
    });
});



