// fecth

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {


    const inputKeyword = document.querySelector('.input-keywords');
    fetch('http://www.omdbapi.com/?apikey=8c2ca10d&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => cards += showcards(m));
            const moviecontainer = document.querySelector('.movie-container');
            moviecontainer.innerHTML = cards; 
        
            // Ketka model detail di klik
            const moviedetailbutton = document.querySelectorAll('.modal-detail-button');
            moviedetailbutton.forEach(btn => {
                btn.addEventListener('click', function(){
                    const imdbid = this.dataset.imdbid;
                    console.log(imdbid);
                    fetch('http://www.omdbapi.com/?apikey=8c2ca10d&i=' + imdbid)
                        .then(response => response.json())
                        .then(m => {
                            const moviedetail = showdetail(m);
                            const modalbody = document.querySelector('.modal-body');
                            modalbody.innerHTML = moviedetail;
                        })
                });
            });
        });
});



function showcards(m){
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

