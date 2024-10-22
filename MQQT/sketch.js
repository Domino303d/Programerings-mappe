
//variabler til at indsætte i HTML 
let m5NameDiv, m5StatusDiv
//denne variable bruges til at håndterer mqtt
let client

function setup() {
  //tag fat i de 2 html elementer vi vil modificerer
m5NameDiv = select('#m5_1 header')
m5StatusDiv = select('#m5_1 .status')

  //vi kan bruge mqtt.connect fordi vi har inkluderet mqtt.js i html filen
  client = mqtt.connect('wss://mqtt.nextservices.dk');

  //on er en asynkron EVENT (stor bogstaver pga. det er et event baseret kode), som kaldes når vi får en besked fra mqtt serveren
client.on('connect', function(svar){
console.log(svar, 'serveren er kalr till mqtt kommunikationen')
}
)
//nu vil vi gerne sunscribe på et emne
client.subscribe('programmering')

//og så skal vi sætte den LISTENER op som skal modtag input fra MQTT
client.on('message', function(emne, besked){
  //emnet kommer som en string
  console.log(emne)
  //beskeden skal vi lige parse før vi kan læse den
  console.log(besked.toString())
  //det vi får fra m5'eren er i det her eksempel i JSON format
  let json = JSON.parse(besked.toString())
  //nu kan jeg bruge data fra JSON objektet
  console.log(json.name, 'her er navnet fra JSON objektet')
  //så kan vi opdater HTML dokumentet
  m5NameDiv.html(json.name)
  m5StatusDiv.html(json.status)
    //HVIS status er true, skal vi give klassen "true"
    if(json.status){
    m5StatusDiv.addClass("true")
  }else{
    m5m5StatusDiv.removeClass("true")
  }
})



}