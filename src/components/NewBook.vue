
<template>

 <v-app id="inspire">
    <v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex >
            <v-card class="elevation-12">


                      
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Add a Book</v-toolbar-title>     <v-spacer></v-spacer>  
                   
                    </v-toolbar>


 <form @submit.prevent="saveBook" >
  <v-container fluid >
    <v-row  align="center"
          justify="center">
      <v-col cols="12" sm="6">
        <v-text-field v-model="book_id"  label="Book ID" >   </v-text-field>
        <v-text-field v-model="title" label="Title">  </v-text-field>
        <v-text-field v-model="author" label="Author">    </v-text-field>
        <v-text-field v-model="published" label="Date Published">    </v-text-field>
        <v-text-field v-model="genre" label="Genre">    </v-text-field>
        <v-text-field v-model="bookCount" label="Stock">    </v-text-field>
        <v-btn class="button" type="submit"> Submit</v-btn>
        <v-btn class="button"> <router-link  to="/admin" class="router">Cancel</router-link> </v-btn>
      </v-col>
    </v-row>

  </v-container>
    </form>



    </v-card>
          </v-flex>
        </v-layout>
      </v-container>  
    </v-content>
 </v-app>
</template>

<script>
import {AppDB} from './firebaseInit'
// import firebase from 'firebase';
export default {
    name: 'new-book',
    data(){
        return{
            book_id: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null,
            currentUser:false,
            userEmail:[],
            userList:''
        }
    },
    methods: {
        saveBook(){

          
        //   if(firebase.auth().currentUser){
         
        //     this.currentUser = firebase.auth().currentUser.email;
        // }
        //         this.userEmail =   this.currentUser.split("@")
        //   this.userList='User/'+this.userEmail[0];

          AppDB.ref( 'Books').push().set({
                ID: this.book_id,
                title: this.title,
                author: this.author,
                genre: this.genre,
                published: this.published,
                bookCount: this.bookCount
            })
            .then(() => { this.$router.push('/admin') })
            .catch()
        }
    },
    created(){

    }
}
</script>

<style scoped>

.router{
      text-decoration: none; 
}
.button{ margin:3%;}

</style>
