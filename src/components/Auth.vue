<template>

 <v-form >
      <v-text-field label="Username/Email" v-model="email"></v-text-field>
      <v-text-field type="password" label="Password" v-model="password"></v-text-field>
      <v-btn v-on:click="login" >Login</v-btn>
</v-form>
</template>

<script>
import firebase from 'firebase';
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
           this.$router.go({ path: this.$router.path });    }
          
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