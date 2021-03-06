// Add divs, Bootstrap, fontawesome search icon and custom CSS for Jumbotron, containers, search input and the button and append to the body
const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid newJumbo');
const $contain1 = $('<div>').addClass('container-fluid d-flex align-items-center');
const $h1 = $('<h1>').attr('id', 'h1').addClass('pb-3 text-center').text('Welcome to Tune Tips!');
const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0 col-2');
const $btnIcon = $('<i>').addClass('fas fa-search');
const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter Artist, ex: Michael Jackson'}).addClass('form-control aria-label text');
const $searchRow = $('<div>').addClass('container container-fluid d-flex flex-row float-left w-25');
const $contain2 = $('<div>').attr('id', 'cont-2').addClass('container-fluid d-flex align-items-center');
const $artistInfo = $('<h2>');
const $topTracks = $('<h2>');
const $trackDiv = $('<div>').addClass('container-s container container-fluid fade-in tracks');
const $olTrack = $('<ol>');
const $infoDiv = $('<div>').addClass('container-s container container-fluid fade-in tracks text-justify');

$btn.append($btnIcon);
$contain1.append($searchInput, $btn);
$jumboDiv.append($h1, $contain1, $searchRow);
$('body').append($jumboDiv);

// Runs on page load. Checks for items in localStorage and adds them to the search history as clickable buttons in $searchRow to enable persistent functionality
$(() => {
    const keyNames = Object.keys(localStorage)
    for (art in keyNames) {
        let artNm = keyNames[art]
        $searchRow.append($('<button>').addClass('btn btn-light searchHist').text(artNm).on('click', () => {
            $searchInput.val(artNm);
            getArtist();
            $searchInput.val('');
        }));
    };
});

// Retrieve artist info and top 10 tracks. Adds a container div and two divs, one for the artist bio and one for the top tracks. Top tracks are displayed in an ordered list. divs are then appended to the body
const getArtist = (artistName) => {
    // Clears divs of any data
    $olTrack.text(" ");
    $infoDiv.text(" ");

    // Returns out of function if $searchInput.val() is empty, ex: user just presses the Enter key or clicks Search
    if (!$searchInput.val()) return;

    // Adds divs, Bootstrap and custom CSS to container/cards showing the artist's info and top tracks once the user inputs an artist
    $artistInfo.addClass('text-capitalize search-input text-center pb-2 h2-font').text(`Top Tracks for: ${artistName ? artistName : $searchInput.val()}`);
    $topTracks.addClass('text-capitalize search-input text-center pb-2 h2-font').text(`Info about: ${artistName ? artistName : $searchInput.val()}`);
    
    $jumboDiv.append($searchRow);
    $infoDiv.append($artistInfo);
    $trackDiv.append($topTracks, $olTrack);
    $contain2.append($infoDiv, $trackDiv);
    $('body').append($contain2);

    // AudioDB API
    $.ajax({
        // Retrieves top 10 tracks, creates li for each track and appends to $olTrack
        url: `https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=${$searchInput.val()}`,
        method: 'GET',
        success: (data) => {
            for (i = 0; i < data.track.length; i++) {
                $olTrack.append($('<li>').addClass('taj-text').text(data.track[i].strTrack));
            };
        }
    });

    // last.fm API
    $.ajax({
        // Retrieves artist information and appends to $infoDiv
        url: `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${$searchInput.val()}&api_key=c8fa358f2006de3b95aa7bf6026a6017&format=json`,
        method: "GET",
        success: (response) => {
            // Slices last.fm link from artist info
            $infoDiv.addClass('taj-text').append(response.artist.bio.summary.slice(0, -24));
        }
        // Set artist name in localStorage and append a button with the artist's name to $searchRow. New button can then be clicked and the search will run again
    }).then((response) => {
        if (!(response.artist.name in localStorage)) {
            localStorage.setItem(response.artist.name, response.artist.name);
            $searchRow.append($('<button>').addClass('btn btn-light searchHist').text(response.artist.name).on('click', () => {
                $searchInput.val(response.artist.name);
                getArtist(response.artist.name);
                $searchInput.val('');
            }));
        };
    });

    // Clears form input field
    $searchInput.val('');
};

// Adds click button/search history button(s) and Enter keypress functionality to run getArtist function after user input/activity
$btn.on('click', getArtist);

$searchInput.on('keypress', (enter) => {
    if (enter.which === 13) {
        getArtist();
    };
});

 