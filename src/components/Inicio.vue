<template>
    <div>
        <section class="vh-100 gradient-custom">
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card">
                            <div class="card-header">
                                Iniciar sesión
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="unUsuario" class="form-label">Usuario</label>
                                        <input type="text" class="form-control" id="unUsuario"
                                            aria-describedby="emailHelp" v-model="usuario.unUsuario">
                                    </div>
                                    <div class="mb-3">
                                        <label for="unaContrasena" class="form-label">Contraseña</label>
                                        <input type="password" class="form-control" id="unaContrasena" v-model="usuario.unaContrasena">
                                    </div>                                    
                                </form>
                                <button class="btn btn-primary" v-on:click="cuentaAcceso">Ingresar</button>
                                <router-link :to="'/registrarse'" class="btn btn-link">Registrarse</router-link>                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import gql from "graphql-tag"
    export default {
        data() {
            return {
                usuario: {
                    unUsuario: "",
                    unaContrasena: ""
                }
            }
        },
        methods: {
            cuentaAcceso(){
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation Mutation($unUsuario: String!, $unaContrasena: String!) {
                            cuentaAcceso(unUsuario: $unUsuario, unaContrasena: $unaContrasena) {
                                usuario
                                token
                            }
                        }`,
                    // Parameters
                    variables: {
                        unUsuario: this.usuario.unUsuario,
                        unaContrasena: this.usuario.unaContrasena
                    },
                 }).then((data) => {
                     console.log(data.data)

                    localStorage.setItem('usuario', data.data.cuentaAcceso.usuario);
                    localStorage.setItem('token', data.data.cuentaAcceso.token);

                    this.$router.push('lista') 


                 }).catch((error) => {
                    // Error
                    console.log(error)
                    alert("Error en el usuario o contraseña !!!")
                 })
            }
        },
        renderTriggered(){
            //console.log(this.acceso)
        }
    }
</script>