<script setup>
import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onUnmounted, onBeforeUnmount, watch } from "vue";
import { aleatorio, getPokemon, obtenerDebilidades } from './api/pokeapi';
  


let loanding = ref(true)
let Pokemon = ref({})
let debil = ref([])
let n = ref(0)



onBeforeMount(()=> {
  console.log("aun no hay DOM")
})

onMounted(async ()=>{
  n.value = aleatorio()
  Pokemon.value = await getPokemon(n.value)
    console.log(Pokemon.value)
    loanding.value = false
  debil.value = await obtenerDebilidades(Pokemon.value.types[0].type.url)

})

onBeforeUpdate(()=> {
  console.log("antes de actualizar")
})
onUpdated(()=>{ 
  console.log("Despues de actualizar")
})
onBeforeUnmount(()=>{
  console.log("Antes de desmontar")
})

onUnmounted(()=>{
  console.log("Despues de desmontar")
})



</script>

<template>
  <p v-if="loanding">cargando datos</p>
  <div class="container">
    <div class="card" :style="{'--Pokemon-tipe': `var(--${Pokemon.types?.[0]?.type?.name})`}">
      <div class="front">
        <h2>{{Pokemon?. name}}</h2> 
        <img :src="Pokemon?.sprites?.other?.['official-artwork']?.front_default"  >
        <div>
          <h2>Altura: {{ Pokemon?. height / 10  }} m</h2>
          <h2>Peso: {{ Pokemon?. weight / 10 }} kg</h2>
        </div>
      </div>

      <div class="back">
        <h2 v-for="tipo in Pokemon.types" :key="tipo.type.name">{{ tipo.type.name }}</h2>
      
      
      </div>
    </div>
  </div>
  

  <!-- <div class="container" v-else>
    <div class="window">
      
      
      <img :src="Pokemon?.sprites?.other?.['official-artwork']?.front_default"  >
    </div> 
  </div> -->
</template>

<style lang="css">
:root{
  --steel:#89a1b0;
  --water:#539ae2;
  --bug: #94bc4a;
  --dragon:#6a7baf;
  --electric:#e5c531;
  --ghost:#846ab6;
  --fire:#ea7a3c;
  --fairy:#e397d1;
  --ice:#70cbd4;
  --fighting:#cb5f48;
  --Normal:#aab09f;
  --grass:#71c558;
  --pysichic:	#e5709b;
  --rock:#b2a061;
  --dark:#736c75;
  --ground:#cc9f4f;
  --poison:#b468b7;
  --flying:#7da6de;

}

html{
  font-size: 62.5%;
  box-sizing: border-box;
}

body{
  font-size: 1.6rem;
}

.container{
  min-height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.card{
  background-color: var(--fire);
  height: 40rem ;
  width: 30rem;
  border-radius: 2rem;
  border: solid 1rem;
  padding: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  perspective: 2000px;
  cursor: pointer;
  

  position: relative;
  transition: transform 0.7s;
  transform-style: preserve-3d;
}

.card .front{
  background-color: var(--Pokemon-tipe);
}
/* .inner{
  width: 100%;
  height: 100%;
  background-color: black;
  padding: 1rem;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  
} */

.front,
.back{
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 1rem;
  box-sizing: border-box ;
}

.card:hover{
  transform: rotateY(180deg);
}

.front{
  background-color: var(--fire);
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(30, 40, 90, 0.15);
}
.back{
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #B6B4A4, #1812DE);
  color: #fff;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  box-shadow: 0 10px 30px rgba(80, 70, 230, 0.35);
}


</style>