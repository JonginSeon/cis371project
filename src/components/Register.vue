<template>
  <v-form  @submit.prevent="saveUser">
        <v-text-field label="Username/Email" v-model="email"></v-text-field>
        <v-text-field type="password" label="password" v-model="password"></v-text-field>

        <v-btn v-on:click="register" >Register</v-btn>

  </v-form>
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
