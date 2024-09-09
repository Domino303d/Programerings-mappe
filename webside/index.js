let currentPage = 1

let pages //array med alle elementer med class = page
let menuitems //array med alle menupunkterne

function setup(){
    console.log("okay buddy lets say that")
    //shiftPage er funktioenn der tag et tal og skifter siden

    pages = selectAll('.page')
    menuitems = selectAll('.menuitem')

    //menuitems skal reagere med at skifte side
for( m of menuitems){
m.mousePressed( function(e){
//e.target er selve html div'en
    console.log(e.target.id)
    //slice -1 henter det sidste bogstav i en string
    let nr = e.target.id.slice(-1)
    //nu kan vi kalde shiftPage som skifter side
    shiftPage(nr)


} )

}


    //nu kan man se at pages er blevet til en liste med alle class = page ting
    //console.log(page.length)
console.log(pages.length)



shiftPage(currentPage)
//vent 2 sek. og sæt så klasen hidden på header- så menu bliver væk
setTimeout(function(){
    select('header').addClass('hidden')
}, 2000)
}

function shiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1
    }
    
    if(num == "ArrowRight"){
        num = currentPage + 1
    }
    
    if(isNaN(num)|| num > pages.length || num == 0){
        return

    }

select("#menu" + currentPage).removeClass("active")
select("#page" + currentPage).removeClass("visible")
currentPage = num
select("#page" + currentPage).addClass("visible")
select("#menu" + currentPage).addClass("active")
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}



    //Først kalder vi server API'ets endpoint
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')

    //så venter vi på serverens promise, der kommer tilbage med .then()
    .then(
        function(response){
            //lad os tjekke om serverens response er okay
            console.log(response)
            //og hvis det er det, beder vi serveren om at give os json resultatet 
            return response.json()
        }
    )
    //og når DET så komer tilbage 
    .then(
        function (data){
            //vi har nu en random drink
            console.log(data)
        }
    )
