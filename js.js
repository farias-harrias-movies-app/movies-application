//make a get request for the json server;
let html = '';
(function renderMovies() {
    $.ajax('http://localhost:3000/movies').done(data => {
        console.log(data)

        data.forEach(data => {
            console.log(data)
            html += '<div class="card">'
                // '<img>' + possible image
            html += '<div class="card-body">'
            html += `<h5>${data.title}</h5>`
                //possible description
            html += `<p>${data.rating}</p>`
            html += '</div>'
        })
        html += '<form>'
        html += '<label for="movie-title">'
        html += '<input type="text" id="movie-title" name="movie-title">'
        html += '<input type="text" id="movie-rating" name="movie-rating">'
        html += '<button type="button">Submit</button>'
        return $('#container').html(html)
    })
})();

//create boxes to display movie using json object

//create a form for adding new objects to the json server
function newMovie(){

    $.ajax("http://localhost:3000/movies", {
        type: "POST",
        data: {
            title: $('#moveie-title').val(),
            ratings: $('#movie-rating').val()
        }
    });
}
$('button').click(newMovie());
//attach the get after sending any alterations to the server
//add and edit option
//delete option to remove it from the json server
//bonus use the omdb to render posters for the movie and possibly more information