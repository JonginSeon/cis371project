<template>
    <v-simple-table>
    <!-- book table -->
    <v-container class="table">
        <v-row >
            <v-col >Title</v-col>
            <v-col >Author</v-col>
            <v-col >Detials</v-col>
        </v-row>

        <v-row v-for="book in books"  v-bind:key="book.id">
            <v-col >   <v-chip >{{book.genre}}</v-chip> {{book.title}}</v-col>
            <v-col> {{book.author}}</v-col>
            <v-col> <router-link class="router" v-bind:to="{name: 'view-book', params: {book_id: book.ID}}">
                <v-icon>mdi-eye</v-icon></router-link> </v-col>
        </v-row>
        <br><br>
        <router-link to="/new" class="router"><v-icon>mdi-plus-circle</v-icon></router-link>
    
  

    <!-- user table -->
        <v-row >
            <v-col >user email</v-col>
            <v-col >Detials</v-col>
        </v-row>

<v-row v-for="user in users"  v-bind:key="user.Email">
   <v-col> {{user.Email}}</v-col>
    <v-col> <router-link class="router" v-bind:to="{name: 'view-user', params: {user_email: user.Email}}">
                <v-icon>mdi-eye</v-icon></router-link> </v-col>
 </v-row>
  </v-container>
    </v-simple-table>
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
                this.books.push(data);
            })
        }),


        AppDB.ref('Users').on('value', (snapshot) => {
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
