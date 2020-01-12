$(document).ready(function () {

    var painters = ['Picasso', 'Monet', 'Rembrandt']

    // function to create buttons
    function makeButton() {

        // for loop that creates each button
        for (var i = 0; i < painters.length; i++) {

            // variable to hold button values
            var buttons = $('<button value="' + painters[i] + '">' + painters[i] + '</button>')

            // appending buttons to div
            $('#buttons-appear-here').append(buttons);
        }
    };

    // calling function to create buttons
    makeButton();


    //onclick that creates ten images
    $(document).on('click', 'button', function () {

        // Removing previous images, and previous p elements
        $('img').remove();
        $('p').remove();

        // Grabbing and storing the data-animal property value from the button
        var searchVal = $(this).val();

        // Constructing a queryURL using the *value added to each image in makeButton
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchVal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=g";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {

                // saving results into a variable
                var results = response.data;

                // for loop to create ten images
                for (var i = 0; i < results.length; i++) {

                    // Variable to hold div by id
                    var resultDiv = $("<div class='paintWrapper'>");

                    // variable to create an image with: class gif, data-state still, and
                    // with a url for both animated and non animated
                    var resultImg = $("<img class='gif' data-state='still' notAnimated='" + results[i].images.fixed_height_still.url + "'animate='" + results[i].images.fixed_height.url + "'>")

                    // variable paragraph to hold rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // giving the image a src
                    resultImg.attr("src", results[i].images.fixed_height_still.url);

                    //prepending images
                    resultDiv.append(resultImg);

                    // prepending ratings
                    resultDiv.append(p);

                    //Add divs, including resultImg & p elements to gifs-appear-here DIV
                    $("#gifs-appear-here").prepend(resultDiv);

                }
            });
    });

    // onclick for dynamically created images
    $(document).on('click', '.gif', function () {

        // variable to hold data-state which is set to still(initially)
        var state = $(this).attr("data-state");

        // if statement for onclick, if not still show notAnimated, and vice versa
        if (state !== "still") {
            $(this).attr("src", $(this).attr("notAnimated"));
            $(this).attr("data-state", "still");
        } else {
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("data-state", "animate");
        }
    })

    //submit button for form
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // adding user input to a variable
        var searchTerm = $("#searchTerm").val();

        // pushing user input from variable into painters array
        painters.push(searchTerm);

        //remove previous buttons
        $('button').remove();

        //call makeButton function to create new array of buttons
        makeButton();
    })



});




