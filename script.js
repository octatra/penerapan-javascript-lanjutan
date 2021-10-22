$('.search-button').on('click', function(){
    $.ajax({
        url:'http://www.omdbapi.com/?apikey=8c2ca10d&s=' + $('.input-keywords').val(),
        success: result => {
            console.log(result);
            const movies = result.Search;
            console.log(movies);
            let card = '';
            movies.forEach(m => {
                card += showcard(m);
            });
            $('.movie-container').html(card);
    
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=8c2ca10d&i=' + $(this).data('imdbid'),
                    success: m => {
                        const moviedetail = showdetail(m) ;
    
                    $('.modal-body').html(moviedetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                
                });
            });
    
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });    
});


function showcard(m){
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#moviedetail" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showdetail(m){
    return `<div class="contain-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>${m.Title}</strong></li>
                            <li class="list-group-item"><strong>${m.Year}</strong></li>
                            <li class="list-group-item"><strong>${m.Released}</strong></li>
                            <li class="list-group-item"><strong>${m.Genre}</strong></li>
                            <li class="list-group-item"><strong>${m.Director}</strong></li>
                            <li class="list-group-item"><strong>${m.Actors}</strong></li>
                        </ul>
                    </div>
                </div>
            </div>`;
}