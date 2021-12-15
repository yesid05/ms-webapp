<template>
    <div>
        <section class="vh-100 gradient-custom">
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card">
                            <div class="card-header">
                                Registrarse
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="unNombre" class="form-label">Nombre:</label>
                                        <input type="text" class="form-control" id="unNombre" required
                                            v-model="usuario.unUsuario">
                                    </div>
                                    <div class="mb-3">
                                        <label for="unApellido" class="form-label">Apellido:</label>
                                        <input type="text" class="form-control" id="unApellido" required
                                            v-model="usuario.unApellido">
                                    </div>
                                    <div class="mb-3">
                                        <label for="unCorreo" class="form-label">Correo electrónico:</label>
                                        <input type="email" class="form-control" id="unCorreo" required
                                            v-model="usuario.unCorreo">
                                    </div>
                                    <div class="mb-3">
                                        <label for="unNombreUsuario" class="form-label">Nombre de usuario:</label>
                                        <input type="text" class="form-control" id="unNombreUsuario" required
                                            v-model="usuario.unNombreDeUsuario">
                                    </div>
                                    <div class="mb-3">
                                        <label for="unaContrasena" class="form-label">Contraseña:</label>
                                        <input type="password" class="form-control" id="unaContrasena" required
                                            v-model="usuario.unaContrasena">
                                    </div>
                                </form>
                                <button type="submit" class="btn btn-primary"
                                    v-on:click="cuentaCrear">Registrarse</button>
                                <router-link :to="'/'" class="btn btn-link">Ya tengo una cuenta</router-link>
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
        setup() {

        },
        data() {
            return {
                usuario: {
                    unUsuario: "",
                    unApellido: "",
                    unNombreDeUsuario: "",
                    unCorreo: "",
                    unaContrasena: ""
                }
            }
        },
        methods: {
            cuentaCrear() {
                this.$apollo.mutate({
                    // Query
                    mutation: gql `mutation Mutation($unNombre: String!, $unApellido: String!, $unNombreDeUsuario: String!, $unCorreo: String!, $unaContrasena: String!) {
                        cuentaCrear(unNombre: $unNombre, unApellido: $unApellido, unNombreDeUsuario: $unNombreDeUsuario, unCorreo: $unCorreo, unaContrasena: $unaContrasena) {
                            usuario
                            token
                        }
                    }`,
                    // Parameters
                    variables: {

                        unNombre: this.usuario.unUsuario,
                        unApellido: this.usuario.unApellido,
                        unNombreDeUsuario: this.usuario.unNombreDeUsuario,
                        unCorreo: this.usuario.unCorreo,
                        unaContrasena: this.usuario.unaContrasena
                        
                    },
                }).then((data) => {
                    console.log(data.data)

                    localStorage.setItem('usuario', data.data.cuentaCrear.usuario);
                    localStorage.setItem('token', data.data.cuentaCrear.token);

                    this.$router.push('lista')


                }).catch((error) => {
                    // Error
                    console.log(error)
                    console.log(this.usuario)
                    alert("Error al crear la cuenta !!!")
                })
            }
        },
    }
</script>