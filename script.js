const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row pl-5');
const $h1 = $('<h1>').addClass('pb-3 pl-5').text('Welcome to TuneTips!');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0').text('Tune Tips!');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter Artist'}).addClass('form-control aria-label text');
const $artist = $('<div>').addClass('h2 pt-3 pb-2');
$contain1.append($searchInput, $btn);
$jumboDiv.append($h1, $contain1);
$('body').append($jumboDiv);

const showArtist = ($artist) => {
    this.addClass('text-capitalize').text($searchInput.val());
    $('body').append(this);
};

const getArtist = () => {
    // AudioDB API
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://theaudiodb.p.rapidapi.com/searchtrack.php?s=${$searchInput.val()}&t=yellow`,
        method: "GET",
        headers: {
            "x-rapidapi-key": "3d0129d893msh65e57270d365ab7p1d1e20jsn134535a62282",
            "x-rapidapi-host": "theaudiodb.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done((response) => {
        console.log(response);
    });

    // Artist Info API
    const settings = {
        async: true,
        crossDomain: true,
        url: `https://artist-info.p.rapidapi.com/getArtistInfo?Kostas=${$searchInput.val()}`,
        method: "GET",
        headers: {
            "x-rapidapi-key": "3d0129d893msh65e57270d365ab7p1d1e20jsn134535a62282",
            "x-rapidapi-host": "artist-info.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done((response) => {
        console.log(response);
    });
};

