var topics = ["The Office", "Stranger Things", "Archer", "Game of Thrones", "Broad City", "Futurama", "Parks and Rec", "Spongebob", "Brooklyn 99", "Bob's Burgers"];

function setButtons() {
    for (var i = 0; i < topics.length; i++) {
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
            if ((results[i].rating) != "r") {
            var gifDiv = $("<div class='gif'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var showImage = $("<img>").attr("src", results[i].images.fixed_height_still.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still");
            console.log(results[i].images.fixed_height_still.url);
            gifDiv.prepend(p);
            gifDiv.prepend(showImage);
            $(".resultGifs").prepend(gifDiv);
            };
        };
    });
};

$("#addShow").on("click", function() {
    event.preventDefault();
    var tvshow = $("#showInput").val().trim();
    console.log(tvshow);
    var addButton = $("<button>").attr("class", "button").attr("data-show", tvshow).text(tvshow);
    $(".buttons").append(addButton);
});

$(document).on("click", ".button", displayGif);

$(document).on("click", "img", function() {
    if ($(this).attr("data-state") == "still") {
        var animateURL = $(this).attr("data-animate");
        $(this).attr("src", animateURL);
        $(this).attr("data-state", "animate");
    } else {
        var stillURL = $(this).attr("data-still");
        $(this).attr("src", stillURL);
        $(this).attr("data-state", "still");
    }
});


setButtons();

jQuery(document).ready(function(){
    $('h1').mousemove(function(e){
      var rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
      var rYP = (e.pageY - this.offsetTop-$(this).height()/2);
      $('h1').css('text-shadow', +rYP/10+'px '+rXP/80+'px rgba(227,6,19,.8), '+rYP/8+'px '+rXP/60+'px rgba(255,237,0,1), '+rXP/70+'px '+rYP/12+'px rgba(0,159,227,.7)');
    });
 });
