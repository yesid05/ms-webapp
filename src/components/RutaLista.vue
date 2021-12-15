<template>
  <div>
    <div id="nav">
      <router-link to="/lista">Inicio</router-link> | 
      <router-link to="/agenda">Silla agendada</router-link> | 
      <router-link to="/salir">Salir</router-link>
    </div>
    <div class="container">
      <h1>Lista de rutas</h1>
      <div class="list-group" v-for="ruta in buscarRuta" :key="ruta.id">
        <router-link :to=" '/detalle/' + ruta.id " class="list-group-item list-group-item-action" aria-current="true">
          <div class="d-flex w-10 0 justify-content-between">
            <h5 class="mb-1">{{ ruta.descripcion }}</h5>
          </div>
          <p class="mb-1">{{ ruta.tiempo }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
    import gql from "graphql-tag"
    export default {
        created(){
            console.log("creado")
            this.verificarIngreso()
        },
        setup() {
        },
        data(){
            return{
                buscarRuta: [],
                estaAutenticado: false,
            };
        },
        methods: {
          verificarIngreso(){
            if(!localStorage.getItem('token')){
              this.$router.push('/') 
            }
          }
        },
        apollo: {
            buscarRuta: gql `query Query {
                buscarRuta {
                  id
                  descripcion
                  tiempo
                }
              }`,
        },
        renderTriggered(){
            console.log(this.buscarRuta)
        }
    }
</script>