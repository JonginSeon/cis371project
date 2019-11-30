<template>


  <v-app id="inspire">
    <v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
  <v-card-text>
  <v-form  @submit.prevent="saveUser">
        <v-text-field label="Username/Email" v-model="email"></v-text-field>
        <v-text-field type="password" label="Password" v-model="password"></v-text-field>

        <v-btn v-on:click="register" >Register</v-btn>

  </v-form>
  </v-card-text>


 </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>


</template>

<script>
import firebase from 'firebase';
import {AppDB} from './firebaseInit'

export default {
 name: 'register',
 data: function() {
   return {
     email: '',
     password: ''
   };
 },
 methods: {
   register: function(e) {
     firebase
       .auth()
       .createUserWithEmailAndPassword(this.email, this.password)
       .then(
         u => {
          // console.log(user);

          AppDB.ref('Users').push().set({
                Email: this.email,
            })
           
           alert(`Account Created for ${u.user.email}`);
           
           this.$router.go({ path: this.$router.path });
         },
         err => {
           alert(err.message);
         }
       );
     e.preventDefault();
   },
   saveUser(){

       

   }
 }
};
</script>


