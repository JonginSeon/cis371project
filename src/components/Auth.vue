<template>

 <v-form >
      <v-text-field label="Username/Email" v-model="email"></v-text-field>
      <v-text-field type="password" label="Password" v-model="password"></v-text-field>
      <v-btn v-on:click="login" >Login</v-btn>
</v-form>
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

// const nodemailer = require("nodemailer");



//    let transporter = nodemailer.createTransport({
//        service: 'gmail',
//        port: 25,
//        secure: false, // true for 465, false for other ports
//        auth: {
//            user: "seonj", // generated ethereal user
//            pass: "School123" // generated ethereal password
//        },
//        tls:{
//          rejectUnauthorized: false
//        }
//    });

//    let HelperOption ={
//     from:'"Jongin Seon" <seonj@mail.gvsu.edu',
//     to: 'seonj@mail.gvsu.edu',
//      subject: 'test email',
//        text: 'Hello world?'
       

//    }
// transporter.sendMail(HelperOption, (error,info)=>{

//   if(error){return alert(error);}

// })


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

