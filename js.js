//make a get request for the json server;
let edittedMovie;
let editId;
let joiner;
let x;
let movieId = [];
let link;


{setTimeout(() => {x = link},1300)}


let getMovies = async () => {
    let html = '';
    //this resets the html variable
    $.ajax('http://localhost:3000/movies').done(async data => {
        console.log(data)
        //cycles through the array of movies
        data.forEach( (data) => {
            html += '<div class="card" style="width: 300px;">'
            html += `<img src ="${x}" class="card-img-top imgs" alt ="..." >`
            html += `<h3>${data.title}</h3>`
            html += `<p>Rating: ${data.rating}</p>`
            html += '<div class="buttonHolder">'
            html += `<button id="${data.id}" class="editButton cardButton" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Edit</button>`
            html += `<button id="${data.id}" class="deleteButton cardButton">Delete</button>`
            html += '</div>'
            html += '</div>'
            movieId.push(data.id)
        })
        console.log($('#container'))
        $('#container').html(html)
        //hides the loading page
        $('canvas').css('display', 'none')
    })
}
getMovies()

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
    setTimer();
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

function deleteMovie(id) {
    fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
}

function setTimer () {
    setTimeout(() => {
    $('#submitButton').click(e => {
        e.preventDefault();
        addMovie()
        renderImgs()
    })
}, 1500);
}
setTimer();


function renderImgs (){
    setTimeout( () => {
    movieId.forEach( y => {
    let getMovieImg = async (y) => {
    console.log(y)
    await fetch(`http://localhost:3000/movies/${y}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(async data => {
            // console.log(data);
            let spliter = (data.title.split(' '))
            joiner = spliter.join('+')
            console.log(joiner)
            await fetch(`http://www.omdbapi.com/?apikey=${MOVIE_TOKEN}&t=${joiner.trim()}`)
                .then(resp => resp.json())
                .then(data => {
                    link = data.Poster;
                })
        })
        .catch(error => console.error(error));

    let imgs = $('.imgs')
    imgs[y - 1].src = link
    }
    getMovieImg(y)
    })
    },1300)
}
// renderImgs();

setTimeout(() => {
    $('.editButton').click(e => {
       $('#popUpScreen').css( 'display', 'flex')
        editId = e.target.id
    })
}, "1500");

    $('#editSubmit').click(e => {
        e.preventDefault();
        let id = editId
        edittedMovie = {
            title : $('#editMovieTitle').val(),
            rating : Number($('#editMovieRating').val())
        }
        editMovie(id)
    })

setTimeout(() => {
        $('.deleteButton').click( e => {
            e.preventDefault();
            editId = e.target.id;
            console.log(editId)
            deleteMovie(editId)
        })
}, 5000)

setTimeout(() => {
    $('.editButton').click( e => {
        e.preventDefault();
        editId = e.target.id;
        console.log('hi')
        $('#popUpScreen').css('display', 'flex')
    })
}, 5000)

//create boxes to display movie using json object
//create a form for adding new objects to the json server
//attach the get after sending any alterations to the server
//add and edit option
//delete option to remove it from the json server
//bonus use the omdb to render posters for the movie and possibly more information