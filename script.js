const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row pl-5');
const $h1 = $('<h1>').addClass('pb-3 pl-5').text('Welcome to Your OpenWeather');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0').text('See Your Weather');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter your location, ex: Columbus, OH'}).addClass('form-control aria-label text');
const $artist = $('<div>').addClass('h2 pt-3 pb-2');
$contain1.append($searchInput, $btn);
$jumboDiv.append($h1, $contain1);
$('body').append($jumboDiv);

const showLocation = () => {
    $artist.addClass('text-capitalize').text($searchInput.val());
    $('body').append($artist);
  };