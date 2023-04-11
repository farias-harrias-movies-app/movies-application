//make a get request for the json server;
(function renderMovies() {
    $.ajax('http://localhost:3000/movies').done(data => {
        console.log(data)
        let html = '<div class="card">'
            // '<img>' + possible image
        html += '<div class="card-body">'
        html += `<h5>${data[0].title}</h5>`
            //possible description
        html += `<p>${data[0].rating}</p>`
        html += '</div>'
        html += '</div>'
        $('#container').html(html)
    })
})();

//create boxes to display movie using json object

//create a form for adding new objects to the json server
//attach the get after sending any alterations to the server
//add and edit option
//delete option to remove it from the json server
//bonus use the omdb to render posters for the movie and possibly more information