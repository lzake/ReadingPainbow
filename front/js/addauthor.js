$(document).ready(function() {
    $(".save").click(function(x) {
        x.preventDefault();
        $.post("https://agile-tundra-76451.herokuapp.com/authors", {
            authorFirstName: $("#authorFirstName").val(),
            authorLastName: $("#authorLastName").val(),
            bio: $("#bio").val(),
            portraitUrl: $("#portraitUrl").val()
        }, $('.save-status').text('Book Added!').fadeIn(200).show().delay(15000).fadeOut(500)).fail(function() {
            $('.save-status').text('Failure, please refresh and try again').fadeIn(200).show().delay(5000).fadeOut(500)
        })
    });
});



