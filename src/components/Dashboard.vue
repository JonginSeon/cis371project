<template>
    <v-simple-table>
    <h1>{{currentUser}}</h1>
        <v-container class="table">
                <v-toolbar-title>Admin Books</v-toolbar-title>
            <br><br>
        <v-row >
            <v-col >Title</v-col>
            <v-col >Author</v-col>
        </v-row>
        <v-row v-for="adminBook in adminBooks"  v-bind:key="adminBook.id">
            <v-col >   <v-chip >{{adminBook.genre}}</v-chip> {{adminBook.title}}</v-col>
            <v-col> {{adminBook.author}}</v-col>
            <router-link class="router" v-bind:to="{name: 'view-book', params: {book_id: adminBook.ID}}">
                <v-icon>mdi-eye</v-icon></router-link> 
        </v-row>
        <br><br>
        <!-- <router-link to="/new" class="router"><v-icon>mdi-plus-circle</v-icon></router-link> -->
    
    </v-container>


  <v-container class="table">
        <v-toolbar-title>User Books</v-toolbar-title>
          <br><br>
        <v-row >
            <v-col >Title</v-col>
            <v-col >Author</v-col>
        </v-row>
        <v-row v-for="book in books"  v-bind:key="book.id">
            <v-col >   <v-chip >{{book.genre}}</v-chip> {{book.title}}</v-col>
            <v-col> {{book.author}}</v-col>
            <router-link class="router" v-bind:to="{name: 'user-new-book', params: {book_id: book.ID}}">
                <v-icon>mdi-eye</v-icon></router-link> 
        </v-row>
        <br><br>
        <router-link to="/new" class="router"><v-icon>mdi-plus-circle</v-icon></router-link>
    
    </v-container>



    </v-simple-table>



</template>


<script>
import { AppDB } from './firebaseInit'
import firebase from 'firebase';
export default {
    name: 'dashboard',
    data(){
        return{
            adminBooks:[],
            books: [],
            currentUser: false,
            userEmail:[],
            userList:''
        }
    },

    created(){

        
          if(firebase.auth().currentUser){
            this.currentUser = firebase.auth().currentUser.email;
            this.userEmail =   this.currentUser.split("@")
            this.userList='User/'+this.userEmail[0];



        AppDB.ref(this.userList).on('value', (snapshot) => {
            snapshot.forEach((element) => {
                const data = {
                    'title': element.val().title,
                    'author': element.val().author,
                    'genre': element.val().genre,
                    'published': element.val().published,
                    'bookCount': element.val().bookCount,
                    'ID': element.val().ID

                }
               
                this.books.push(data);
            })
        })


        AppDB.ref('Books').on('value', (snapshot) => {
            snapshot.forEach((element) => {
                const data = {
                    'title': element.val().title,
                    'author': element.val().author,
                    'genre': element.val().genre,
                    'published': element.val().published,
                    'bookCount': element.val().bookCount,
                    'ID': element.val().ID

                }
               
                this.adminBooks.push(data);
            })
        })




     }}
}
</script>

<style  scoped>
.router{
      text-decoration: none; 
}
.table{
    width:70vw;
}
</style>
