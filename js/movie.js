let allMovies

function onSuccess(data, status) {

    console.log(data);
    console.log(status);
    allMovies = data;

    $('#target').html(
        function () {
            let html = ""
            for (let i = 0; i < data.length; i++) {
                html += `<div class="card col-2 m-2">
        <div class="text-center card-top">
        <img class="card-img-top poster" src="${data[i].poster}"><br>
        <h3 class="card-title">${data[i].title.toUpperCase()} - 
        <span class="text-muted"> ${data[i].year} </span></h3>
                <img class="rating" src="img/${data[i].rating}stars.jpg"> 
        </div>
        <div class="card-bottom"><div class="card-text"><p class="">${data[i].plot}</p>
 
        <p>Starring: ${data[i].actors}</p>
        <p>Directed by: ${data[i].director}</p>
        </div>
        <div class="d-flex justify-content-around row"><button class="edit btn btn-primary col-5 m-1" id="edit${i}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button><button class="delete btn btn-primary col-5 m-1" id="delete${data[i].id}">Delete</button></div></div>
        </div>`
            }
            return html
        })
    $(".card-bottom").hide()
    $('.card-top').click(function() {
        // $(this).parent().toggleClass("col-4").toggleClass("col-2");
        $(this).next().slideToggle(1000)
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
            let editID = ($(this)[0].id.toString().slice(4, $(this)[0].id.length))
            $('#modal-edit-title').html("Editing: " + (allMovies[editID].title).toUpperCase())
            $('#editActors').val(allMovies[editID].actors)
            $('#editDirectors').val(allMovies[editID].director)
            $('#editTitle').val(allMovies[editID].title)
            $('#editYear').val(allMovies[editID].year)
            $('#editPlot').val(allMovies[editID].plot)
            $('#editRatingNumber').val(allMovies[editID].rating)
            $('#editID').val(allMovies[editID].id)
            $('#editGenres').val(allMovies[editID].genre)
            $('#editPoster').html("<img src='" + allMovies[editID].poster + "'>")
            $('#editPosterURL').val(allMovies[editID].poster)
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



$(document).ready(function() {
    $.get("https://ruddy-enchanting-grasshopper.glitch.me/movies")
        .done(onSuccess)
        .fail(onFail)
        .always(stopLoadingAnimation);
})



// function addMovie() {
// $.post("https://ruddy-enchanting-grasshopper.glitch.me/movies", {
//     title: document.getElementById("movie-title").value,
//     rating: document.getElementById("movie-rating").value,
//     }).done(function(data) {
//         console.log(data);
// })
// }

// $("#add-movie").click(function(e) {
//     e.preventDefault();
//     // addMovie();
//     $('#addID').val(allMovies[allMovies.length-1].id+1)
// })

$("#addMovie").click(function(e) {
    e.preventDefault()
    $(this).disabled = true
    console.log("I'm firing from addMovie on the add-modal!");
    $.post("https://ruddy-enchanting-grasshopper.glitch.me/movies", {
            actors: $('#addActors').val(),
            director: $('#addDirectors').val(),
            title: $('#addTitle').val(),
            year: $('#addYear').val(),
            plot: $('#addPlot').val(),
            rating: $('#addRatingNumber').val(),
            id: $('#addID').val(),
            genre: $('#addGenres').val(),
            poster: $('#addPosterURL').val(),
            }).then(response => {
        console.log(response); $(this).disabled = false;
    }).catch(error => console.log(error))

})

$('#saveChanges').click(function(e) {
    e.preventDefault();
    console.log("I'm firing from save change");
    $("#searchResults").children().remove()
    let movieObj = {
    actors: $('#editActors').val(),
    director: $('#editDirectors').val(),
    title: $('#editTitle').val(),
    year: $('#editYear').val(),
    plot: $('#editPlot').val(),
    rating: $('#editRatingNumber').val(),
    id: $('#editID').val(),
    genre: $('#editGenres').val(),
    poster: $('#editPosterURL').val()
    }
    $(this).disabled = true
    fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $('#editID').val(), {method: 'PATCH', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(movieObj),}).then(response => {
        console.log(response)
        $(this).disabled = false
    }).catch(error => console.log(error))
})

$("#editClose").click($("#searchResults").children().remove())

$("#addClose").click($("#addsearchResults").children().remove())

$("#previewAddPoster").click(function () {
    $("#addPoster").html("<img src='" + $("#addPosterURL").val() + "'>")
})

// let searchResults
// let movieDetails
// let movieCastandCrew

$("#editCheckOMDB").click(function() {
    $("#searchResults").children().remove()
fetch("https://api.themoviedb.org/3/search/movie?api_key=" + omdbV3key +"&language=en-US&query=" + $("#editTitle").val() + "&page=1&include_adult=false&year=" + $("#editYear").val()).then(data => data.json()).then(data => {

    console.log(data);
    console.log(status);
    searchResults = data;
    for (let i =0; i < data.results.length; i++) {
        $("#searchResults").append("<div id=" + data.results[i].id + ">"+ data.results[i].release_date.toString().slice(0,4) + " <img src='https://image.tmdb.org/t/p/w92" + data.results[i].poster_path + "'> " + data.results[i].original_title + "</div>")
    }
    $("#searchResults").children().click(function() {
        console.log($(this).attr("id"))
        fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
            console.log(data)
            movieDetails = data
            $("#editGenres").val(function() {
                genres = []
                for (let i = 0; i < data.genres.length; i++) {
                    genres.push(data.genres[i].name)
                }
                return genres
            })
            $("#editTitle").val(data.title)
            $("#editPlot").val(data.overview)
            $("#editPosterURL").val("https://image.tmdb.org/t/p/w300" + data.poster_path)
            $("#editPoster").html("<img src='" + $("#editPosterURL").val() + "'>");
            $("#editYear").val(data.release_date.toString().slice(0,4))
    })

        fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "/credits?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
            console.log(data);
            movieCastandCrew = data;
            $("#editActors").val(function() {
                actors = []
                for (let i = 0; i < 5; i++) {
                    actors.push(data.cast[i].name); console.log(i)
                }
                return actors
                console.log("The actors I found for this movie are: " + actors)
            });
            $("#editDirectors").val(function() {
                directors = []
                for (let i = 0; i < 50; i++) {
                    if (data.crew[i].job == "Director") {
                        directors.push(data.crew[i].name); break
                    }
                    else {console.log(i)}}
                    return directors
                    console.log("The directors I found for this movie are: " + directors)
                })
            });

            }).catch(error => console.log(error))
}).catch(error => console.log(error))


})

$("#addCheckOMDB").click(function() {
    $("#addsearchResults").children().remove()
    fetch("https://api.themoviedb.org/3/search/movie?api_key=" + omdbV3key +"&language=en-US&query=" + $("#addTitle").val() + "&page=1&include_adult=false&year=" + $("#addYear").val()).then(data => data.json()).then(data => {

        console.log(data);
        console.log(status);
        // searchResults = data;
        for (let i =0; i < data.results.length; i++) {
            $("#addsearchResults").append("<div id=" + data.results[i].id + ">"+ data.results[i].release_date.toString().slice(0,4) + " <img src='https://image.tmdb.org/t/p/w92" + data.results[i].poster_path + "'> " + data.results[i].original_title + "</div>")
        }
        $("#addsearchResults").children().click(function() {
            console.log($(this).attr("id"))
            fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
                console.log(data)
                movieDetails = data
                $("#addGenres").val(function() {
                    genres = []
                    for (let i = 0; i < data.genres.length; i++) {
                        genres.push(data.genres[i].name)
                    }
                    return genres
                })
                $("#addTitle").val(data.title)
                $("#addPlot").val(data.overview)
                $("#addPosterURL").val("https://image.tmdb.org/t/p/w300" + data.poster_path)
                $("#addPoster").html("<img src='" + $("#addPosterURL").val() + "'>");
                $("#addYear").val(data.release_date.toString().slice(0,4))
            })

            fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "/credits?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
                console.log(data);
                // movieCastandCrew = data;
                $("#addActors").val(function() {
                    actors = []
                    for (let i = 0; i < 5; i++) {
                        actors.push(data.cast[i].name); console.log(i)
                    }
                    return actors
                    console.log("The actors I found for this movie are: " + actors)
                });
                $("#addDirectors").val(function() {
                    directors = []
                    for (let i = 0; i < 50; i++) {
                        if (data.crew[i].job == "Director") {
                            directors.push(data.crew[i].name); break
                        }
                        else {console.log(i)}}
                    return directors
                    console.log("The directors I found for this movie are: " + directors)
                })
            });

        }).catch(error => console.log(error))
    }).catch(error => console.log(error))


})

    // https://api.themoviedb.org/3/movie/272?api_key=api-key&language=en-US

    // https://api.themoviedb.org/3/movie/<movie id>/credits?api_key=ba6d2ad3567702f5ab135da63fe57a78&language=en-US