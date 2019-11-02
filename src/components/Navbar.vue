<template>
    <v-toolbar class="blue">
        <v-spacer></v-spacer>

        <v-toolbar-title color= "blue" class="headline text-uppercase">
            <span>GVSU </span>
            <router-link to="/" class="router"><span class="font-weight-light">Library Admin</span></router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-btn text v-if="isLoggedIn"><span class="email white-text">{{currentUser}}</span></v-btn>
            <v-btn text v-if="isLoggedIn"><router-link class="router" to="/">Home</router-link></v-btn>
            <v-btn text v-if="!isLoggedIn"><router-link class="router"  to="/auth">Login</router-link></v-btn>
            <v-btn text v-if="!isLoggedIn"><router-link class="router"  to="/register">Sign Up</router-link></v-btn>
            <v-btn text v-if="isLoggedIn"><button v-on:click="logout" class="btn white black-text">Logout</button></v-btn>
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
.email{
    padding-right: 10px;
}

.router{
      text-decoration: none; 
}
</style>


