// searchMovie.js
$(function(){
	$("body").on("keyup","#searchBar input.searchMovie",searchMoviesByTitle);
});
function searchMoviesByTitle(event){
	console.log('inside function searchMovies');
	if(event.keyCode != 13){
		return false;
	} else {
		var key = event.target.value;
		fetch('http://www.omdbapi.com/?t='+key)
		.then(response=>response.json())
		.then(function(response){
			console.log(response);
			console.log('hi');
			createMovieCard(response);
			createMovieThumbnail(response.Poster);
		});
	}
}

function createMovieThumbnail(url, title){
	console.log('inside function createMovieThumbnail');
	//"https://images-na.ssl-images-amazon.com/images/M/MV5BNDRmOWJkNjItOWE2OS00NzViLWFhNWMtNGVhZDI2MWUzMjZkXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg"
	var src;
	fetch(url).then(function(response) {
		console.log('blob fetched');
		if(response.status == 404){
			throw new Error('Image Not Available');
		} else {
	  		return response.blob();
		}
	})
	.then(function(imageBlob) {
		console.log('blob ');
	  	src = URL.createObjectURL(imageBlob);
	  	$("#poster_" + title).css("background-image","url("+ src +")");
	})
	.catch(function(error){
		console.log('error occurred');
		$("#poster_" + title).css("background-image","url(images/imageNotAvailable.png)");	
	});
	var dsMovieThumbnail = '<header id="poster_' + title + '" class="section__play-btn mdl-cell mdl-cell--3-col-desktop mdl-cell--2-col-tablet mdl-cell--4-col-phone mdl-color--teal-100 mdl-color-text--white movieThumbnail" alt="movie thumbnail" ></header>';
	return dsMovieThumbnail;
}

function createMovieCardRHS(response){
	debugger;
	var ratings = parseFloat(response.Ratings[0].Value.split("/")[0])*10;
	var dsStars = createStars(ratings);
	var dsCardRHS = '<div class="mdl-card mdl-cell mdl-cell--9-col-desktop mdl-cell--6-col-tablet mdl-cell--4-col-phone"><div class="mdl-card__supporting-text"><div class="movieTitle">' + response.Title + '</div>' + dsStars + '<div class="moviePlot">' + response.Plot + '</div></div><div class="mdl-card__actions"><a href="#" class="mdl-button">Read our features</a></div></div>'
              return dsCardRHS;
}

function createStars(rating){
	var ratingWidth = parseInt(rating);
	// https://codepen.io/Bluetidepro/pen/GkpEa
	//var dsStars = '<div class="star-ratings-css"><div class="star-ratings-css-top" style="width: 84%"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div><div class="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div></div>'
	var dsStars = '<div class="star-ratings-sprite"><span style="width:'+ratingWidth+'%" class="star-ratings-sprite-rating"></span></div>';
	return dsStars;
}
function createMovieCard(response){
	var dsMovieThumbnail = createMovieThumbnail(response.Poster, response.Title);
	var dsMovieRHS = createMovieCardRHS(response);
	var dsMovieCard = '<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">'+dsMovieThumbnail + dsMovieRHS +'<button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="btn1" data-upgraded=",MaterialButton,MaterialRipple"><i class="material-icons">more_vert</i><span class="mdl-button__ripple-container"><span class="mdl-ripple"></span></span></button><div class="mdl-menu__container is-upgraded"><div class="mdl-menu__outline mdl-menu--bottom-right"></div></div></section>';
    appendMovieCard(dsMovieCard);
}
function appendMovieCard(dsMovieCard){
	$("#movieList").prepend(dsMovieCard);
}