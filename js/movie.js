let allMovies

function onSuccess(data, status) {

    console.log(data);
    console.log(status);
    allMovies = data;
    $('#target').html(
        function () {
            let html
            for (let i = 0; i < data.length; i++) {
                html += `<div class="card col-4">
        <div class="text-center">
        <img class="card-img-top poster" src="${data[i].poster}"><br>
        <h3 class="card-title">${data[i].title.toUpperCase()} - 
        <span class="text-muted"> ${data[i].year} </span></h3>
                <img class="rating" src="img/${data[i].rating}stars.jpg"> 
        </div>
        <div class="card-text"><p class="">${data[i].plot}</p>
 
        <p>Starring: ${data[i].actors}</p>
        <p>Directed by: ${data[i].director}</p>
        </div>
        <div class="d-flex justify-content-around row"><button class="edit btn btn-primary col-5 m-1" id="edit${data[i].id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button><button class="delete btn btn-primary col-5 m-1" id="delete${data[i].id}" data-bs-toggle="modal" data-bs-target="#editModal">Delete</button></div>
        </div>`
            }
            return html
        })

    $(".delete").click(function (e) {
        e.preventDefault()
        if (confirm("Are you sure you want to delete?")) {
            console.log($(this)[0].id.toString().slice(6, $(this)[0].id.length))
            fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
                console.log(response);
            })
        } else {
            console.log("Aborted delete");
        }
        // console.log($(this)[0].id.toString().slice(6, $(this)[0].id.length))
        // fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
        //     console.log(response);
        // })
    })
        $(".edit").click(function (e) {
            e.preventDefault()
            console.log($(this)[0].id.toString().slice(4, $(this)[0].id.length))
            let editID = ($(this)[0].id.toString().slice(4, $(this)[0].id.length))-1
            $('#modal-title').html("Editing: " + (allMovies[editID].title).toUpperCase())
            $('#editActors').val(allMovies[editID].actors)
            $('#editDirectors').val(allMovies[editID].director)
            $('#editTitle').val(allMovies[editID].title)
            $('#editYear').val(allMovies[editID].year)
            $('#editPlot').val(allMovies[editID].plot)
            $('#editRatingNumber').val(allMovies[editID].rating)
            $('#editID').val(editID + 1)
    })
}

// const deleteMethod = {
//     method: 'DELETE'
//     }
//
// //
// fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(4,$(this)[0].id.length), {method: 'DELETE'}).then(function (response){
//     console.log(response);


    //console.log(`Hello, ${name.toUpperCase()}!`); // Hello, CODEUP!
    // display the requested data to the user


function onFail(status, error) {
    console.log(status)
    console.log(error)
    // tell the user something went wrong, and to try again later
}

function stopLoadingAnimation() {
    $('.loading').addClass('d-none')// the request is no longer pending, hide the loading spinner
}

$.get("https://ruddy-enchanting-grasshopper.glitch.me/movies")
    .done(onSuccess)
    .fail(onFail)
    .always(stopLoadingAnimation);

$(document).ready(function() {

})



function addMovie() {
$.post("https://ruddy-enchanting-grasshopper.glitch.me/movies", {
    title: document.getElementById("movie-title").value,
    rating: document.getElementById("movie-rating").value,
    }).done(function(data) {
        console.log(data);
})
}

$("#add-movie").click(function(e) {
    e.preventDefault();
    addMovie();
})

$('#saveChanges').click(function(e) {
    e.preventDefault();
    console.log("I'm firing from save change");
    let movieObj = {
    actors: $('#editActors').val(),
    directors: $('#editDirectors').val(),
    title: $('#editTitle').val(),
    year: $('#editYear').val(),
    plot: $('#editPlot').val(),
    rating: $('#editRatingNumber').val(),
    id: $('#editID').val()
    }
    fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $('#editID').val(), {method: 'PUT', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(movieObj),}).then(response => console.log(response)).catch(error => console.log(error))
})