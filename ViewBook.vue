
<template>
  <v-card  id="card" class="mx-auto" max-width="400" tile>
      
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Book ID:  {{ID}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Author: {{author}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>Genre: {{genre}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-list-item four-line>
      <v-list-item-content>
        <v-list-item-title>Date of Publication: {{published}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-list-item five-line>
      <v-list-item-content>
        <v-list-item-title>Stock: {{bookCount}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
<v-btn class ="button"  v-if="isAdmin"> <router-link to="/admin" class="router"> Back </router-link></v-btn>
<v-btn class ="button" v-if="!isAdmin"> <router-link to="/" class="router"> Back </router-link></v-btn>

<v-btn class ="button"  v-if="isAdmin" v-on:click="deleteBook" > Delete </v-btn>
<v-btn class ="button"  v-if="!isAdmin" v-on:click="checkOutBook" > Check out this book </v-btn>
  </v-card>
</template>
<script>
import {AppDB} from './firebaseInit'
import firebase from 'firebase';

export default {
    name: 'view-book',
    data(){
        return{
            ID: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null,
            user: null,
            isAdmin: false
        }
    },
    beforeRouteEnter(to, from, next){
        AppDB.ref('Books').on('value', (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);
            let isAdmin = false;

            let find;
            keys.forEach((key) => {
                let book = data[key];
                if(book.ID == to.params.book_id){
                    find = book;
                }
            });


            let user = null;

            if(firebase.auth().currentUser){
              let currentUser = firebase.auth().currentUser.email;
              let userEmail =   currentUser.split("@");
              user = 'User/'+ userEmail[0];
              if(currentUser === "admin@mail.gvsu.edu"){
                isAdmin = true;
              }
            }

            next(vm => {
                vm.ID = find.ID;
                vm.title = find.title;
                vm.author = find.author;
                vm.genre = find.genre;
                vm.published = find.published;
                vm.bookCount = find.bookCount;
                vm.isAdmin = isAdmin;
                vm.user = user;
            })
        })
    },
    methods: {
        deleteBook(){
            if(confirm('Are you sure you want to delete this book?')){
                let uID;
                 AppDB.ref('Books').on('value', (snapshot)=>{
                    const data = snapshot.val();
                    const keys = Object.keys(data);
                    
                    keys.forEach((key) => {
                        let book = data[key];
                       // console.log(book);
                        if(book.ID == this.$route.params.book_id){
                            uID = key;
                        }
                    });

                })

                AppDB.ref('Books/' + uID).remove();
                this.$router.push("/admin");
            }
        },
        checkOutBook(){
          if(confirm('Are you sure you want to check out this book?')){
            let uID;
                 AppDB.ref('Books').on('value', (snapshot)=>{
                    const data = snapshot.val();
                    const keys = Object.keys(data);
                    
                    keys.forEach((key) => {
                        let book = data[key];
                       // console.log(book);
                        if(book.ID == this.$route.params.book_id){
                            uID = key;
                        }
                    });
                })

              let bookTitle, bookAuthor, bookID, bookGenre;
              let newBookCount;
              AppDB.ref('Books/' + uID).on('value', (snapshot) => {
                let data = snapshot.val();
                newBookCount = data.bookCount - 1;
                bookTitle = data.title;
                bookID = data.ID;
                bookAuthor = data.author;
                bookGenre = data.genre;
              });

              if(newBookCount < 0){
                // dont add anything
                confirm("OUT OF STOCK");
              } 
              else{
                AppDB.ref('Books/' + uID).update({bookCount: newBookCount});
                AppDB.ref(this.user).push().set({ID : bookID, title: bookTitle, author: bookAuthor, genre: bookGenre});
                location.reload();
              }

          }
             
        }      
    }
}
</script>
<style scoped>


#card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
.router{
      text-decoration: none; 
}
.button{
    margin:3%;
}
</style>