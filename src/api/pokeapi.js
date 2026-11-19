export async function getPokemon(name){
    const response = await  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
}

export function aleatorio(){
    return Math.floor(Math.random()*500)
}

export async function obtenerDebilidades(url){
    try {
        const res = await fetch(url)
        const data  = await  res.json()
        console.log(data);
        
        return data
    } catch (error) {
        console.log(error);
        
    }
}



    
