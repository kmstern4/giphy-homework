var topics = ["The Office", "Stranger Things", "Archer", "Game of Thrones", "Broad City", "Futurama", "Parks and Rec", "Spongebob", "Brooklyn 99", "Bob's Burgers"];

function setButtons() {
    for (var i = 0; i < topics.length -1; i++) {
        var newButton = $("<button>").attr("class", "button").attr("data-show", topics[i]).text(topics[i]);
        $(".buttons").append(newButton);
    }
};

function displayGif() {
    console.log($(this).attr("data-show"));
    var clickedShow = $(this).attr("data-show");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedShow + "&api_key=50aDhNUwGujMDdTWerTRRk3vQqoOyQW0&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i=0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var showImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            console.log(results[i].images.fixed_height_still.url);
            gifDiv.prepend(p);
            gifDiv.prepend(showImage);
            $(".resultGifs").prepend(gifDiv);
        }
    })
};

$("#addShow").on("click", function() {
    event.preventDefault();
    var tvshow = $("#showInput").val().trim();
    console.log(tvshow);
    var addButton = $("<button>").attr("class", "button").attr("data-show", tvshow).text(tvshow);
    $(".buttons").append(addButton);
});

$(document).on("click", ".button", displayGif);


setButtons();
