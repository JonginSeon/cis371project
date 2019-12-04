<template>

 <v-app id="inspire">
    <v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex >
            <v-card class="elevation-12">
              
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Available Books</v-toolbar-title>     <v-spacer></v-spacer>  <router-link to="/new" class="router"><v-icon>mdi-plus-circle</v-icon></router-link>
                   
                    </v-toolbar>

    <v-simple-table>
    <!-- book table -->
    <template  v-slot:default>
    <v-container class="table">
        <v-row >
            <v-col >Title</v-col>
            <v-col >Author</v-col>
            <v-col >Details</v-col>
        </v-row>



        <v-row v-for="book in books"  v-bind:key="book.id">
            <v-col >   <v-chip >{{book.genre}}</v-chip> {{book.title}}</v-col>
            <v-col> {{book.author}}</v-col>
            <v-col> <router-link class="router" v-bind:to="{name: 'view-book', params: {book_id: book.ID}}">
                <v-icon>mdi-eye</v-icon></router-link> </v-col>
        </v-row>
        <br><br>

</v-container>

  </template>

    </v-simple-table>

     </v-card>
          </v-flex>
        </v-layout>
      </v-container>  
    </v-content>
  

<v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex >
            <v-card class="elevation-12">
              
 <v-toolbar color="primary" dark flat>
                <v-toolbar-title>All Users</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>


    <v-simple-table>
    <!-- book table -->
    <template  v-slot:default>
  <v-container class="table">
    <!-- user table -->
        <v-row >
            <v-col >user email</v-col>
            <v-col >Details</v-col>
        </v-row>

<v-row v-for="user in users"  v-bind:key="user.Email">
   <v-col> {{user.Email}}</v-col>
    <v-col> <router-link class="router" v-bind:to="{name: 'view-user', params: {user_email: user.Email}}">
                <v-icon>mdi-eye</v-icon></router-link> </v-col>
 </v-row>
 
 
  </v-container>
  

  </template>

    </v-simple-table>

     </v-card>
          </v-flex>
        </v-layout>
      </v-container>  
    </v-content>



  </v-app>
  
</template>


<script>
import { AppDB } from './firebaseInit'
export default {
    name: 'admin',
    data(){
        return{
            books: [],
            users:[]
        }
    },
    created(){
        AppDB.ref('Books').once('value', (snapshot) => {
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
        }),


        AppDB.ref('Users').once('value', (snapshot) => {
                    snapshot.forEach((element) => {
                        const data1 = {
                            'Email': element.val().Email,
                        }
                        this.users.push(data1);
                    })
                })







    }
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
