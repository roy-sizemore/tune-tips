<<<<<<< HEAD

$(document).ready( function(){
    const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
    const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row pl-5');
    const $h1 = $('<h1>').addClass('pb-3 pl-5').text('Welcome to TuneTips!');
    const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0').text('Tune Tips!');
    const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter Artist'}).addClass('form-control aria-label text');
    const $artist = $('<div>').addClass('h2 pt-3 pb-2');
    $contain1.append($searchInput, $btn);
    $jumboDiv.append($h1, $contain1);
    $('body').append($jumboDiv);
    
    const showArtist = () => {
        $artist.addClass('text-capitalize').text($searchInput.val());
        $('body').append($artist);
    };
    
    const getArtist = () => {
       alert("test") // AudioDB API
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
    
    $btn.on('click', getArtist);
    // $searchInput.on('keypress', (e) => {
    //   e.preventDefault();
    //     console.log(e);
    //   if (e.which === 13) {
    //     getArtist();
    //   };
    // });
});
   
=======
$(document).ready(() => {
    // Add divs and Bootstrap classes for Jumbotron, containers, search input, artist and the button and append to the body
    const $jumboDiv = $('<div>').addClass('jumbotron jumbotron-fluid');
    const $contain1 = $('<div>').addClass('container container-fluid d-flex flex-row pl-5');
    const $h1 = $('<h1>').attr('id', 'h1').addClass('pb-3 pl-5').text('Welcome to Tune Tips!');
    const $btn = $('<button>').addClass('btn btn-dark flex-shrink-0 col-2').text('Search');
    const $searchInput = $('<input>').attr({type: 'text', placeholder: 'Enter Artist, ex: The Weekend'}).addClass('form-control aria-label text');
    $contain1.append($searchInput, $btn);
    $jumboDiv.append($h1, $contain1);
    $('body').append($jumboDiv);

    // Retrieve artist info and top 10 tracks 
    const getArtist = () => {

        const $topTracks = $('<h2>').addClass('h2 text-capitalize search-input').text(`Top Tracks for: ${$searchInput.val()}`);
        const $artistInfo = $('<h3>').addClass('h2 text-capitalize search-input').text(`Info about: ${$searchInput.val()}`);
        const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-row p-5 m-5');
        const $trackDiv = $('<div>').addClass('container-s col-4 flex-column p-5 m-5');
        const $olTrack = $('<ol>');
        const $infoDiv = $('<div>').addClass('container-s col-4 p-5 m-5');
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
            url: `http://ws.audioscrobbler.com/2.0//2.0/?method=artist.getinfo&artist=${$searchInput.val()}&api_key=c8fa358f2006de3b95aa7bf6026a6017&format=json`,
            method: "GET",
            success: (response) => {
                console.log(response);
            }
        });
    };

    const footer = () => {moment().format('YYYY')};

    // Button and Enter key functionality
    $btn.on('click', getArtist);
    $searchInput.on('keypress', (enter) => {
        if (enter.which === 13) {
            getArtist();
        };
    });
});

>>>>>>> a49bd714463dd4e5b8c828413e20d2b0279082c0
