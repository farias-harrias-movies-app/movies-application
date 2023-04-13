//make a get request for the json server;
let edittedMovie;
let editId;
let joiner;


function getMovies(){
    //this resets the html variable
    let html = '';
    $.ajax('http://localhost:3000/movies').done(data => {
        console.log(data)
        //cycles through the array of movies
        data.forEach( (data) => {
            html += '<div class="card" style="width: 20rem;">'
            html += '<img src ="..." className ="card-img-top" alt ="..." >'
            html += `<h3>${data.title}</h3>`
            html += `<p>Rating: ${data.rating}</p>`
            html += '<div class="buttonHolder">'
            html += `<button id="${data.id}" class="editButton cardButton">Edit</button>`
            html += `<button id="${data.id}" class="deleteButton cardButton">Delete</button>`
            html += '</div>'
            html += '</div>'
        })
        html +='<form id="form">'
        html += '<input type="text" id="movieTitle"/>'
        html += '<input type="text" id="movieRating"/>'
        html += '<input type="submit" id="submitButton"/>'
        html += '</form>'
        $('#container').html(html)
        //hides the loading page
        $('canvas').css('display', 'none')
    })
}
getMovies();

//this accepts value and post the data
function addMovie(){
    $.ajax("http://localhost:3000/movies", {
        type: "POST",
        data: {
            title: $('#movieTitle').val(),
            rating: Number($('#movieRating').val())
        },
        dataType: 'json',
    }).done (data => data);
    getMovies();
    setTimer()
}

function editMovie(id){
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(edittedMovie)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    getMovies();
}

function setTimer () {
    setTimeout(() => {
    $('#submitButton').click(e => {
        e.preventDefault();
        addMovie()
    })
}, "1500");
}
setTimer();

function deleteMovie(id) {
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));

    getMovies()
}

let id = 5;
function getMovieSearch (id){
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let spliter = (data.title.split(' '))
            joiner = spliter.join('+')
            console.log(joiner)
        })
        .catch(error => console.error(error));

    return joiner;
}


setTimeout(() => {
    console.log(getMovieSearch(id));
}, 1500)


// function getImage(id){
//     fetch(`http://www.omdbapi.com/?apikey=${MOVIE_TOKEN}&t=${getMovieSearch(id)}`)
//         .then(resp => resp)
//         .then(data => console.log(data))
// }

setTimeout(() => {
    $('.editButton').click(e => {
       $('#popUpScreen').css( 'display', 'flex')
        editId = e.target.id
    })
}, "1500");


setTimeout(() => {
    $('#editSubmit').click(e => {
        e.preventDefault();
        let id = editId
        edittedMovie = {
            title : $('#editMovieTitle').val(),
            rating : Number($('#editMovieRating').val())
        }
        editMovie(id)
    })
}, "0");

setTimeout(() => {
    $('.deleteButton').click(e => {
        editId = e.target.id
        deleteMovie(editId)
    })
}, "1500");






// $('#submitButton').click(function (e) {
//     e.preventDefault();
// })
// const r = document.getElementById("submitButton")
// r.addEventListener('click', (e) => {e.preventDefault();
// })


//create boxes to display movie using json object
//create a form for adding new objects to the json server
//attach the get after sending any alterations to the server
//add and edit option
//delete option to remove it from the json server
//bonus use the omdb to render posters for the movie and possibly more information