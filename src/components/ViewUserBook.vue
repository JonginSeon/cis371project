
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
<v-btn class ="button"> <router-link to="/" class="router"> Back </router-link></v-btn>
<v-btn class ="button" v-on:click="returnBook" > Return Book </v-btn>
  </v-card>

</template>
<script>
import {AppDB} from './firebaseInit'
import firebase from 'firebase';

export default {
    name: 'view-user-book',
    data(){
        return{
            ID: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null,
            userList:''
        }
    },
    beforeRouteEnter(to, from, next){


      let currentUser = firebase.auth().currentUser.email;
      let userEmail =   currentUser.split("@");
      let userList= 'User/'+ userEmail[0];
        

        AppDB.ref(userList).on('value', (snapshot) => {
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
                vm.userList = userList;
            })
        })
     
    },
    methods: {
        returnBook(){

          if(firebase.auth().currentUser){
            if(confirm('Are you sure you want to return this book now?')){

                let uID, bookID;
                AppDB.ref(this.userList).on('value', (snapshot)=>{
                    const data = snapshot.val();
                    const keys = Object.keys(data);
                    
                    keys.forEach((key) => {
                        let book = data[key];
                        if(book.ID == this.$route.params.book_id){
                            uID = key;
                            bookID = book.ID;
                            // alert(bookID);
                        }
                    });

                })

                AppDB.ref(this.userList + "/" + uID).remove();

                let count, bookKey;
                AppDB.ref('Books').on('value', (snapshot) => {
                  const data = snapshot.val();
                  const keys = Object.keys(data);
                  keys.forEach((key) => {
                    let book = data[key];
                    if(book.ID == bookID){
                      count = book.bookCount + 1;
                      bookKey = key;
                    }
                  })
                })

                 AppDB.ref('Books/'+ bookKey).update({bookCount: count});

                this.$router.push("/");
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