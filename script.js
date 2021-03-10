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
        const $topTracks = $('<h2>').attr('id', 'h2').text(`Top 10 Tracks for:\n${$searchInput.val()}`);
        const $artistInfo = $('<h2>').attr('id', 'h2').text(`Info about:\n${$searchInput.val()}`);
        const $contain2 = $('<div>').addClass('container container-fluid d-flex flex-row p-5');
        const $trackDiv = $('<div>').addClass('container-s col-4 p-5');
        const $infoDiv = $('<div>').addClass('container-s col-4 p-5');
        $infoDiv.append($artistInfo);
        $trackDiv.append($topTracks);
        $contain2.append($infoDiv, $trackDiv);
        $('body').append($contain2);

        // AudioDB API
        $.ajax({
            // Retrieves top 10 tracks
            url: `theaudiodb.com/api/v1/json/{APIKEY}/track-top10.php?s=${$searchInput.val()}`,
            method: 'GET',
            success: (data) => {
                console.log(data);
            },
        });

        // Artist Info API
        $.ajax({
            // Retrieves artist information
            url: `https://artist-info.p.rapidapi.com/getArtistInfo?Kostas=${$searchInput.val()}`,
            method: "GET",
            headers: {
                "x-rapidapi-key": "3d0129d893msh65e57270d365ab7p1d1e20jsn134535a62282",
                "x-rapidapi-host": "artist-info.p.rapidapi.com"
            },
            success: (data) => {
                console.log(JSON.stringify(data));
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

