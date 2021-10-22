$('.search-button').on('click', function(){
    $.ajax({
        url:'https://api.github.com/search/users?q=' + $('.input-keywords').val(),
        success: result => {
            console.log(result);
            const user = result.items;
            console.log(user);
            let card = '';
            user.forEach(m => {
                card += showcard(m);
            });
            $('.movie-container').html(card);

            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'https://api.github.com/users/' + $(this).data('imdbid'),
                    success: m => {
                        const moviedetail = showdetail(m) ;
                        console.log(m.followers);
    
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
                    <img src="${m.avatar_url}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${m.login}</h5>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#moviedetail" data-imdbid="${m.login}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showdetail(m){
    return `<div class="contain-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.avatar_url}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><strong>User name  : ${m.login}</strong></li>
                            <li class="list-group-item"><strong>Followers  : ${m.followers}</strong></li>
                            <li class="list-group-item"><strong>Following  : ${m.following}</strong></li>
                            <li class="list-group-item"><strong>Repository : ${m.public_repos}</strong></li>
                            <li class="list-group-item"><strong>Alamat     : ${m.location}</strong></li>
                        </ul>
                    </div>
                </div>
            </div>`;
}