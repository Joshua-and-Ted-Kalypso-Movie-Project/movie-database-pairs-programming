function onSuccess(data, status) {
    console.log(data)
    console.log(status)
    $('#loading').addClass('hidden')
    $('#target').html(
    function() {
          let html
        for (let i = 0; i < data.length; i++) {
        html += `<div class="card col-4">
        <div class="text-center">
        <img class="card-img-top poster"" src=${data[i].poster}"><br>
        <h3 class="card-title">${data[i].title.toUpperCase()}</h3>${data[i].year}</div>
        <div class="card-text"><p class="">${data[i].plot}</p>
        <h5 class="">${data[i].rating} / 5 stars</h5> 
        <p>Starring: ${data[i].actors}</p>
        <p>Directed by: ${data[i].director}</p>
        </div>
        <div class="row"><button class="edit btn btn-primary col-5 m-1" id="edit${i}">Edit</button><button class="delete btn btn-primary col-5 m-1" id="delete${i}"}">Delete</button></div>
        </div>`}
        return html})
    }




    //console.log(`Hello, ${name.toUpperCase()}!`); // Hello, CODEUP!
    // display the requested data to the user


function onFail(status, error) {
    console.log(status)
    console.log(error)
    // tell the user something went wrong, and to try again later
}

function stopLoadingAnimation() {
    // the request is no longer pending, hide the loading spinner
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
});

