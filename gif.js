var apiKey = "yRE3ATUquVbyhSaXMxfxkSvDL1aqDxd9";
var sports = ["Golf", "Baseball", "Basketball", "Soccer", "Football"]

$(document).ready(function(){
    buttons();

    function buttons(){
        $("#buttons").empty();
        for (var i = 0; i < sports.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("buttonWords");
            gifButton.attr("data-gifName", sports[i]);
            gifButton.text(sports[i]);
            $('#buttons').append(gifButton);
        }
    }

    $(document).on("click", ".buttonWords", function(){
        var gif = $(this).attr("data-gifName")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response){
                var results = response.data;
                console.log(response);

                for (var i = 0; i < results.length; i++){
                    var gifDiv = $("<div>");
                    // var title = results[i].title;
                    // var _txt = title.charAt(0).toUpperCase()+ title.slice(1);
                    // var t = $("<p>").text("Title: " + _txt);
                    var r = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
                    var gifImage = $("<img>");
                    
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
					gifImage.attr("data-still", results[i].images.fixed_height_still.url);
					gifImage.attr("data-animate", results[i].images.fixed_height.url);
					gifImage.attr("data-state", "still");
					gifImage.addClass("gif");

					// gifDiv.append(t);
					gifDiv.append(r)
					gifDiv.append(gifImage);
					$(".gifDisplay").prepend(gifDiv);
					var state = $(this).attr("data-state");
                }
            });
    });
    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "still");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    });


	$("#giphy-search").keypress(function () {
		var _val = $("#giphy-search").val();
		var _txt = _val.charAt(0).toUpperCase() + _val.slice(1);
		$("#giphy-search").val(_txt);
})

	$("#gifSearchButton").on("click", function () {
		event.preventDefault();
		var input = $("#giphy-search").val();
		input.toUpperCase();

		// if(input='') {
		// 	alert("You did not enter a value")
		// }
		if ($("#giphy-search").val().length == 0) {
			alert("You did not enter a value");
		}

		else {
        sports.push(input);
		console.log(buttons);
		buttons();
		$("#giphy-search").val('');
		}

    });
});