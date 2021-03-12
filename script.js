$(document).ready(() => {
    // Add divs and Bootstrap classes for Jumbotron, containers, search input, artist and the button and append to the body
    const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid newJumbo'); // cut/paste out classes and/or ids you don't want to use and put them in comments off to the side
    const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row pl-5');
    const $h1 = $('<h1>').attr('id', 'h1').addClass('pb-3 pl-5').text('Welcome to Tune Tips!');
    const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0 col-2').text('Search');
    const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter Artist, ex: The Weekend'}).addClass('form-control aria-label text');
    $contain1.append($searchInput, $btn);
    $jumboDiv.append($h1, $contain1);
    $('body').append($jumboDiv);

    // Retrieve artist info and top 10 tracks 
    const getArtist = () => {
        // Adds divs and Bootstrap to container/cards showing the artist's info and top tracks once the user inputs an artist
        const $topTracks = $('<h2>').addClass('text-capitalize search-input').text(`Top Tracks for: ${$searchInput.val()}`);
        const $artistInfo = $('<h2>').addClass('text-capitalize search-input').text(`Info about: ${$searchInput.val()}`);
        const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-column align-items-center');
        const $trackDiv = $('<div>').addClass('container-s col-6 flex-column');
        const $olTrack = $('<ol>');
        const $infoDiv = $('<div>').addClass('container-s col-6 ');
        $infoDiv.append($artistInfo);
        $trackDiv.append($topTracks, $olTrack);
        $contain2.append($infoDiv, $trackDiv);
        $('body').append($contain2);

        // AudioDB API
        $.ajax({
            // Retrieves top 10 tracks
            url: `https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=${$searchInput.val()}`,
            method: 'GET',
            success: (data) => {
                if (data.track.length === 0) {
                    $trackDiv.remove($olTrack);
                    const $zeroText = $('<p>').text("Ain't no luv for this artist, man.");
                    $trackDiv.append($zeroText);
                } else {
                    for (i = 0; i < data.track.length; i++) {
                        $olTrack.append($('<li>').text(data.track[i].strTrack));
                    };
                };
            },
        });

        // last.fm API
        $.ajax({
            // Retrieves artist information
            url: `https://ws.audioscrobbler.com/2.0//2.0/?method=artist.getinfo&artist=${$searchInput.val()}&api_key=c8fa358f2006de3b95aa7bf6026a6017&format=json`,
            method: "GET",
            success: (response) => {
                $infoDiv.append(response.artist.bio.summary);
            }
        });
    };

    // Button and Enter key functionality
    $btn.on('click', getArtist);
    $searchInput.on('keypress', (enter) => {
        if (enter.which === 13) {
            getArtist();
        };
    });
});


/* How to add an id to a jQuery statement:
const sampleStatement = $('<div>').attr('id', 'id-name').addClass('first-class second-class');

If the variable has already been declared:
sampleStatement.attr('id', 'first-id second-id').addClass('first-class second-class);
*/

