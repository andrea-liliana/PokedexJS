const fetchPokemon = () => {

    const pokeName = document.getElementById("pokeName");
    let poke_Name = pokeName.value.toLowerCase();

    const pokeHeight = document.getElementById("Height");

    const pokeWeight = document.getElementById("Weight");

    const pokeId = document.getElementById("IDnumber");
    
    const url = `https://pokeapi.co/api/v2/pokemon/${poke_Name}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            console.log('The pokemon does not exist, try again');
            pokeImage("./images/sad-pikachu.gif");
        }
        else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg);
        showName();

        pokeId.innerHTML = "#" + data.id;
        pokeHeight.innerHTML = "Height: " + parseInt(data.height)/10 + " m";
        pokeWeight.innerHTML = "Weight: " + parseInt(data.weight)/10 + " kg";

        pokeType(data.types);
        pokeStats(data.stats);
        attacking(data.stats);
        defending(data.stats);
        speeding(data.stats);
        }
    );
}

/* Show Image */
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

/* Show Name */
function showName(){

    var poke_Name = document.getElementById("pokeName").value;
    document.getElementById("Name").innerHTML = poke_Name.toLowerCase();

}

/* Show Pokemon Type */
const pokeType = (data) =>{
    
    const Types = document.getElementById("pokemonType");

    if((Object.keys(data).length) == 1){
        Types.innerHTML = "Type: " + data[0]['type']['name'];
    }else{
        Types.innerHTML = `Type: ${data[0]['type']['name']}/${data[1]['type']['name']}`
    }

}

/* Show Statistics */
const pokeStats = (data) =>{

    const Statistics = document.getElementById("pokemonStats");
    Statistics.innerHTML = "Statistics: " + data[0]['base_stat'];

}

/* Show Movements */
const attacking = (data) =>{

    const Attack = document.getElementById("pokemonAttack");
    Attack.innerHTML = "Attack: " + data[1]['base_stat'];

}

const defending = (data) =>{

    const Defense = document.getElementById("pokemonDefense");
    Defense.innerHTML = "Defense: " + data[2]['base_stat'];

}

const speeding = (data) =>{

    const Speed = document.getElementById("pokemonSpeed");
    Speed.innerHTML = "Speed: " + data[5]['base_stat'];

}