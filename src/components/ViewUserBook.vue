
<template>

  <v-card  id="card" class="mx-auto" max-width="400" tile>
       <h1>{{currentUser}}</h1>
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
<v-btn class ="button"> <router-link to="/" class="router"> Back </router-link></v-btn>
<v-btn class ="button" v-on:click="deleteBook" > Delete </v-btn>
  </v-card>

</template>
<script>
import {AppDB} from './firebaseInit'
import firebase from 'firebase';

export default {
    name: 'user-new-book',
    data(){
        return{
            ID: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null,
            currentUser: false,
            userEmail:[],
            userList:''
        }
    },
    beforeRouteEnter(to, from, next){


          if(firebase.auth().currentUser){
         
            this.currentUser = firebase.auth().currentUser.email;
            this.userEmail =   this.currentUser.split("@")
            this.userList='User/'+this.userEmail[0];

        AppDB.ref(this.userList).on('value', (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);

            let find;
            keys.forEach((key) => {
                let book = data[key];
                if(book.ID == to.params.book_id){
                    find = book;
                }
            });

            next(vm => {
                vm.ID = find.ID;
                vm.title = find.title;
                vm.author = find.author;
                vm.genre = find.genre;
                vm.published = find.published;
                vm.bookCount = find.bookCount;
            })
        })
     }
    },
    methods: {
        deleteBook(){
            if(confirm('Are you sure you want to delete this book?')){
                alert(this.currentUser)
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
                this.$router.push("/");
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