let currentPage = 2
let pages //array med alle elementer med class = page

function setup(){
    console.log("okay buddy lets say that")
    select('#page' + currentPage).addClass('visible')
    pages = selectAll('.page')
    //nu kan man se at pages er blevet til en liste med alle class = page ting
    //console.log(page.length)
console.log(pages.length)


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

select("#page" + currentPage).removeClass("visible")
currentPage = num
select("#page" + currentPage).addClass("visible")
}

function keyPressed(){
    console.log(key)
    shiftPage(key)
}