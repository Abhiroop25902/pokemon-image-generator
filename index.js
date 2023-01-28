async function initializePage() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
        {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => { return data.results })
}

async function getPokemonImageLink(pokemonUrl) {
    let pokemonData = await fetch(pokemonUrl, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => { return data })

    return pokemonData.sprites.other['official-artwork'].front_default;
}

async function showRandomPokemon(pokemonList) {
    const randomNumber = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomNumber];

    const pokemonName = randomPokemon.name;
    document.getElementById('pokemon-name').textContent = pokemonName;

    document.getElementById('pokemon-image').src = "src/images/circular_progress_indicator.gif";
    const pokemonImageLink = await getPokemonImageLink(randomPokemon.url);
    document.getElementById('pokemon-image').src = pokemonImageLink;
}


async function main() {
    const pokemonList = await initializePage();

    showRandomPokemon(pokemonList);

    document.getElementById('next-pokemon')
        .addEventListener('click', () => showRandomPokemon(pokemonList))
}

main();






