//make a get request for the json server;
let html = '';
(function getMovies(){
    $.ajax('http://localhost:3000/movies').done(data => {
        console.log(data)
        data.forEach( (data) => {
            html += `<div>${data.title}<br>${data.rating}</div>`
        })
        html +='<form id="form">'
        html += '<input type="text" id="movieTitle"/>'
        html += '<input type="text" id="movieRating"/>'
        html += '<input type="submit" id="submitButton"/>'
        html += '<form>'
        $('#container').html(html)
    })
})()



setTimeout(() => {
    $('#form').click(e => {
        e.preventDefault();
        alert("hello")
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