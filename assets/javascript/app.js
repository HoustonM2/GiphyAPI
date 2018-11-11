// The names that will be prelisted
var nflGifs = ["Tom Brady", "Randy Moss", "Adrian Peterson", "Ed Reed","Jerry Rice","Joe Flacco"];

// Function for "showing" the gifs
function showGif() {

    
    for (var i = 0; i < nflGifs.length; i++) {

        // Creating a button for the names in the array above
        var likeNfl = $("<button>");
        // Adding a class to button
       likeNfl.addClass("nflGif");
        // Adding a data attribute
        likeNfl.attr("data", nflGifs[i]);
       
        likeNfl.text(nflGifs[i]);

        $("#forButtons").append(likeNfl);
    }
}

// Click Function for adding Gifs on
$("#addOngif").on("click", function(event) {
    event.preventDefault();

    var nflGif = $("#gifid").val();

    nflGifs.push(nflGif);

    showGif();
});

// Calling the function to show gifs
showGif();

//  On click functions for the id of forButtons
//Ajax method below
$("#forButtons").on("click", "button",function() {
    var person = $(this).attr("data");
    var URL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=11";
        
    //ajax method
    $.ajax({ url: URL,method: "GET" })
        //second part if ajax method
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var pTag = $("<p class='rating'>").text("Rating " + rating);

                //creating variable for the picture

                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("gif");

                gDiv.prepend(pTag);
                gDiv.prepend(gifImage);

                //Adding the gifs to be shown in the gifPlace div

                $("#gifPlace").prepend(gDiv);

                //function for the ability to pause and continue gifs

                $(".gif").on("click", function() {
                    var view = $(this).attr("data-state");
                    if (view === "still") {

                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"))
                        $(this).attr("data-state", "still");

                    }
                });
            }
        });
});