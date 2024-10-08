function setup(){
   // hentTopPosts("okZyox");
    // Kalder funktionen 'hentTopPosts' med argumentet "okZyox" ved programmets start.
    select('#searchButton').mousePressed(function(){
        subreddit = select('#searchInput').value()
        hentTopPosts( subreddit )
    })
}

//async betyder at funktionen kan vente på at ting er færdige - fx. at hente data
async function hentTopPosts(subreddit) {

//måden vi tømmer HTML DIV'en, er ved at vi selecter page ID'en og lægger intet inden i html'et
select('#page1 .right').html('')
        //først sætter vi et response object = metoden fetch som henter data.
        //det tag noget tid derfor keyworded er "await"
        try{
       const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=8`)
        //når vi så får det objekt tilage og HVIS response.ok = true
        //så kan vi bruge metoden .json() til at læse en readable stream og kovert den til en json format.
        //den operation tag også noget tid - derfor keywordet "await" IGEN

        const json = await response.json();
        //og så kan vi bruge DATAfra serveren i json format

        console.log(json.data.children)
        //post er et array med poster fra json objectet

        let post = json.data.children

        //vi løber arrayet med poster igennem
        for(p of post ){
            //og nu kan vi logge forskellige egenskaber ved hver post til konsollen
            console.log(p.data.title)
            console.log(p.data.url)
            console.log(p.data.wls)
            console.log(p.data.ups)
            console.log(p.data.thumbnail)
            console.log(p.data.author)
            createPost(p.data)
        }

    }catch( e ){
        console.log("det gik ikke så godt me det",e)
        select('#page1 .right').html('der findes ikke en subreddit med det navn')
    }
}

function createPost(post){
    //vi laver først en reference til det HTML element vi ville sætte poster ind i
     let rightDiv = select('#page1 .right')   
     //lad os give posten en container
     let container = createDiv().addClass('post')
     let author = createElement('h1',post.author)
     container.child(author)


     //lad os give den en titel
     let title = createElement('h1', post.title)
     //hvergang jeg har lavet et element skal det ind i et container.
     container.child(title)
     //vi laver et link til posten på nettet
     //alt hvad vi har af data lægger inden i post
     let link = createA(post.url, 'bloom more')
     //lægger link ind i container html
     container.child(link)
     
     //laver et element for at vise hvormange upvotes postet har
     let up = createElement('h1','UpVotes '+post.ups)
     //lægger det ind i html
     container.child(up)
     //så laver vi billede som baggrund til containerne
     container.style('background-image', `url(${post.thumbnail})`)
     //vi lægge container ind i et HTML dokument
     rightDiv.child(container)
     
}