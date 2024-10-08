let query, button

function setup(){
    button = select('#searchButton')
    button.mousePressed(
        function(){
            query = select('#query').value()
            hentTopPosts(query)
        }
    )
}

async function hentTopPosts(subreddit) {
    //måden vi tømmer HTML DIV'en, er ved at vi selecter page ID'en og lægger intet inden i html'et
    select('#page1 .right').html('')

    try {
        const response = await fetch(`https://api.jikan.moe/v4/schedules/${subreddit}?sfw`);
        // Bruger 'fetch' til at hente data fra Reddit API'et for den angivne 'subreddit'.
        // 'await' venter på, at 'fetch' anmodningen fuldføres.

        const data = await response.json();
        // Parser responsen til JSON-format.
        // 'await' venter på, at parsing er færdig.
        console.log(data)

        const posts = data.data;
        // Ekstraherer arrayet af indlæg fra den modtagne data.

        for (const post of posts) {

            
            createPost(post);
            //kalder 'createPost' for at oprette det på siden.
        }

    } catch (fejl) {
        console.error('Der opstod en fejl:', fejl);
        // Håndterer eventuelle fejl, der opstår under hentningen af data.
    }
}

function createPost(post){
    console.log(post);
    // Logger hele indlægsobjektet til konsollen for debugging.

    let htmlDiv = select('#page1 .right');
    // Vælger HTML-elementet, hvor indlægget skal indsættes (den højre kolonne).

    let container = createElement('div').addClass('post');
    // Opretter et nyt 'div' element og tilføjer klassen 'post' for styling.

    container.style('background-image', `url(${post.images.jpg.image_url})`);
    // Sætter baggrundsbilledet til indlæggets thumbnail.

    let title = createElement('h2', post.title);
    // Opretter et 'h2' element med indlæggets titel.

    let rank = createElement('h2', 'rank ' + post.rank).addClass('rank');
    // Opretter et 'p' element med forfatterens navn og tilføjer klassen 'author'.

    container.child(title);
    container.child(rank);
    // Tilføjer 'title' og 'author' elementerne som børn til 'container'.

    htmlDiv.child(container);
    // Tilføjer hele 'container' til den valgte HTML-div, så det vises på siden.
} 