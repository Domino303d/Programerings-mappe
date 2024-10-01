function setup(){
    hentTopPosts("okZyox");
    // Kalder funktionen 'hentTopPosts' med argumentet "cats" ved programmets start.
}

//async betyder at funktionen kan vente på at ting er færdige - fx. at hente data
async function hentTopPosts(subreddit) {


        //først sætter vi et response object = metoden fetch som henter data.
        //det tag noget tid derfor keyworded er "await"
       const response = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=8`)
        //når vi så får det oject tilage og HVIS response er ok = true
        //så kan vi bruge metoden .json() til at læse en readable stream
        //dn operation tag også noget tid - derfor keywordet "await" IGEN

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

} 

function createPost(post){
    //vi laver først en reference til det HTML element vi ville sætte poster ind i
     let rightDiv = select('#page1 .right')   
     //lad os give posten en container
     let container = createDiv().addClass('post')
//lad os give den en titel
let title = createElement('h1', post.title)
//hvergang jeg har lavet et element skal det ind i et container.
    container.child(title)



     rightDiv.child(container)
     
}