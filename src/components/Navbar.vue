<template>
    <v-toolbar class="navigation" dark color="primary">
       <v-spacer></v-spacer>

        <v-toolbar-title color= "primary" class="headline text-uppercase">
            <span>GVSU </span>
            <span class="font-weight-light">Library</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text v-if="isLoggedIn"><span class="email white-text">{{currentUser}}</span></v-btn>
            <v-btn text v-if="(!isAdmin && isLoggedIn)"><router-link class="router" to="/">Home</router-link></v-btn>
            <router-link class="router"  to="/auth"><v-btn text x-large v-if="!isLoggedIn">Login</v-btn></router-link>
            <router-link class="router"  to="/register"><v-btn text x-large v-if="!isLoggedIn">Sign Up</v-btn></router-link>
            <v-btn text v-if="isLoggedIn" v-on:click="logout" class="btn white black-text">Logout</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>



<script>
import firebase from 'firebase';
export default {
    name: 'navbar',
    data(){
        return{
            isLoggedIn: false,
            isAdmin: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser){
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
            if(this.currentUser === "admin@mail.gvsu.edu"){
                this.isAdmin = true;
            }
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.$router.go({ path: this.$router.path });
            });
        }
    }
};
</script>


<style scoped>
.navigation{
    background-color: #1976D2 !important;
}

.email{
    padding-right: 10px;
}

.router{
      text-decoration: none; 
}
</style>


