//make a get request for the json server;




function getMovies(){
    let html = '';
    $.ajax('http://localhost:3000/movies').done(data => {
        console.log(data)
        data.forEach( (data) => {
            html += `<div>${data.title}<br>${data.rating}<button id="${data.id}" class="editButton">edit</button></div>`
        })
        html +='<form id="form">'
        html += '<input type="text" id="movieTitle"/>'
        html += '<input type="text" id="movieRating"/>'
        html += '<input type="submit" id="submitButton"/>'
        html += '</form>'
        $('#container').html(html)
        $('canvas').css('display', 'none')
    })
}
getMovies();

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
let editId;
setTimeout(() => {
    $('.editButton').click(e => {
       $('#popUpScreen').css( 'display', 'flex')
        editId = e.target.id
    })
}, "1500");

let edittedMovie;
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