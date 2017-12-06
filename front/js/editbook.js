$(document).ready(function() {
    $(".save").click(function(x) {
        x.preventDefault();
        $.post("https://agile-tundra-76451.herokuapp.com/books", {
            title: $("#booktitle").val(),
            genre: $("#genre").val(),
            description: $("#description").val(),
            coverURL: $("#coverurl").val()
        }, $('.save-status').text('This Author has been Added!').fadeIn(200).show().delay(5000).fadeOut(500)).fail(function() {
            $('.save-status').text('Failure, please refresh and try again').fadeIn(200).show().delay(5000).fadeOut(500)
        })
    });
});



