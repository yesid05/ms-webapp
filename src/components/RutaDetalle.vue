<template>
    <div>
        <div id="nav">
            <router-link to="/lista">Inicio</router-link> | 
            <router-link to="/agenda">Silla agendada</router-link> | 
            <router-link to="/salir">Salir</router-link>
        </div>
        <div class="container">
            <h1>Detalle de una ruta</h1>
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <span class="nav-link active" aria-current="true" id="btnRuta" @click="tabRuta">Ruta</span>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link" id="btnComentario" @click="tabComentrio">Agregar comentario</span>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="card" id="card">
                        <div class="card-body">
                            <h5 class="card-title">Ruta: {{ buscarRutaPorId.descripcion }}</h5>
                            <p class="card-text">Hora de salida: {{ buscarRutaPorId.tiempo }}</p>
                        </div>
                    </div>
                    <form class="oculto" id="frmComentario">
                        <div class="mb-3">
                            <label for="unaRuta" class="form-label">Ruta</label>
                            <input type="text" class="form-control" id="unaRuta" readonly v-model="buscarRutaPorId.descripcion">
                        </div>
                        <div class="mb-3">
                            <label for="unUsuario" class="form-label">Usuario</label>
                            <input type="text" class="form-control" id="unUsuario" readonly v-model="comentario.unUsuario">
                            
                        </div>
                        <div class="mb-3">
                            <label for="unComentario" class="form-label">Comentario</label>
                            <textarea class="form-control" id="unComentario" rows="3" v-model="comentario.unComentario"></textarea>
                            <div id="emailHelp" class="form-text">Agregué su comentario</div>
                        </div>
                        <button type="submit" class="btn btn-primary" @click="agregarComentario">Enviar</button>
                    </form>
                </div>

            </div>
            <div class="row">
                <h1>Comentarios</h1>
                <div v-if="buscarComentarioPorIdMenu.length === 0">
                    <h3>Aún no hay comentarios. !!</h3>
                </div>
                <div v-else class="col-sm-6" style="margin-top: 10px;" v-for="c in buscarComentarioPorIdMenu" :key="c.id">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{{ c.usuario }}</h5>
                            <p class="card-text">{{ c.comentario }}</p>
                        </div>
                    </div>
                </div>
                <!--
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.
                            </p>
                        </div>
                    </div>
                </div>
                -->
            </div>
        </div>
    </div>
</template>
<script>
    import gql from "graphql-tag"
    export default {
        data(){
            return{
                buscarRutaPorId: '',
                id: this.$route.params.id,
                comentario: {
                    unUsuario: localStorage.getItem('usuario'),
                    unComentario: '',
                },
                buscarComentarioPorIdMenu: [],
            };
        },
        methods: {
            agregarComentario(){
                 this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation Mutation($unId: Int!, $unUsuario: String!, $unComentario: String!) {
                            agregarComentario(unId: $unId, unUsuario: $unUsuario, unComentario: $unComentario) {
                                usuario
                                comentario
                            }
                        }`,
                    // Parameters
                    variables: {
                        unId: Number(this.buscarRutaPorId.id),
                        unUsuario: this.comentario.unUsuario,
                        unComentario: this.comentario.unComentario
                    },
                 }).then((data) => {
                     console.log(data)
                 })
            },
            tabRuta() {

                var btnRuta = document.getElementById('btnRuta')

                if(!btnRuta.classList.contains('active')){
                    var card = document.getElementById('card')
                    card.classList.toggle('oculto')

                    
                    btnRuta.classList.add('active')

                    var formulario = document.getElementById('frmComentario')
                    formulario.classList.toggle('visible')

                    var btnComentario = document.getElementById('btnComentario')
                    btnComentario.classList.remove('active')
                }
            },
            tabComentrio() {

                var btnComentario = document.getElementById('btnComentario')

                if(!btnComentario.classList.contains('active')){

                    var card = document.getElementById('card')
                    card.classList.toggle('oculto')

                    var btnRuta = document.getElementById('btnRuta')
                    btnRuta.classList.remove('active')

                    var formulario = document.getElementById('frmComentario')
                    formulario.classList.toggle('visible')

                    
                    btnComentario.classList.add('active')
                }

                
            }
        },
        apollo: {
            buscarRutaPorId: {
                query: gql`query Query($unId: Int!) {
                        buscarRutaPorId(unId: $unId) {
                            id
                            descripcion
                            tiempo               
                        }
                    }`,
                variables() {
                    return{
                        unId: Number(this.id)
                    }
                },
            },
            buscarComentarioPorIdMenu: {
                query: gql`query Query($unIdMenu: Int!) {
                    buscarComentarioPorIdMenu(unIdMenu: $unIdMenu) {
                            usuario
                            comentario
                        }
                    }`,
                variables() {
                    return{
                        unIdMenu: Number(this.id)
                    }
                },
            }
        },
        renderTriggered(){
            //console.log(this.buscarRutaPorId)
            console.log(this.buscarComentarioPorIdMenu)
        }
    }
</script>
<style>
    .oculto {
        display: none !important;
    }

    .visible {
        display: block !important;
    }

    li span {
        cursor: pointer;
    }
</style>