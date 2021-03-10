const getArtist = () => {
    // AudioDB API
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://theaudiodb.p.rapidapi.com/searchtrack.php?s=coldplay&t=yellow",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3d0129d893msh65e57270d365ab7p1d1e20jsn134535a62282",
            "x-rapidapi-host": "theaudiodb.p.rapidapi.com"
        }
    };
        
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
};

getArtist();