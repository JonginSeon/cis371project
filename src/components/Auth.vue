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
 <v-form >
      <v-text-field label="Username/Email" v-model="email"></v-text-field>
      <v-text-field type="password" label="Password" v-model="password"></v-text-field>
      <v-btn v-on:click="login" >Login</v-btn>
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
// import { error } from 'util';
export default {
 name: 'login',
 data: function() {
   return {
     email: '',
     password: ''
   };
 },
 methods: {
   login: function(e) {
     firebase
       .auth()
       .signInWithEmailAndPassword(this.email, this.password)
       .then(
         () => {
            if(this.email==="admin@mail.gvsu.edu"){
             // alert("Hello Admin");
             this.$router.push('/admin')
            }
          else{    //alert(`You are logged in as ${this.email}`);

           this.$router.go({ path: this.$router.path });
               }
          
         },
         err => {
           alert(err.message);
         }
       );
     e.preventDefault();
   }
 }
};
</script>

