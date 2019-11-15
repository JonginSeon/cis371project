<template>
    <v-simple-table>
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
        <v-toolbar-title>Your Checked Out Books</v-toolbar-title>
          <br><br>
        <v-row >
            <v-col >Title</v-col>
            <v-col >Author</v-col>
        </v-row>
        <v-row v-for="book in books"  v-bind:key="book.id">
            <v-col >   <v-chip >{{book.genre}}</v-chip> {{book.title}}</v-col>
            <v-col> {{book.author}}</v-col>
            <router-link class="router" v-bind:to="{name: 'view-user-book', params: {book_id: book.ID}}">
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



        AppDB.ref(this.userList).once('value', (snapshot) => {
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
               
                this.adminBooks.push(data);
            })
        })




     }}
     ,
     mounted(){
        //alert("This is inside mounted");
        AppDB.ref(this.userList).once('value', (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);

            keys.forEach((key) => {
                let book = data[key];
                //console.log("Due Date: " + book.dueDate);
                let dueDate = new Date(book.dueDate);
                let todaysDate = new Date();
                let Difference_In_Time = todaysDate.getTime() - dueDate.getTime();
                let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                if(Difference_In_Days > 0){
                    alert(book.title + " is past due");
                }
                if(Difference_In_Days === 0){
                    alert(book.title + " is due today");
                }

            })
        })

        AppDB.ref('Books').once('value', (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);

            keys.forEach((key) => {
                let book = data[key];
                if(book.WaitList){
                    let array = Object.values(book.WaitList);
                    //console.log(array.length);
                    for(let i=0; i<array.length; i++){
                        if(array[i] === firebase.auth().currentUser.email){
                            alert(book.title + " is back in stock");
                            let bookKey = key;
                            let index = array.indexOf(firebase.auth().currentUser.email);
                            array.splice(index, 1);
                            console.log(array);
                            let newObject = Object.assign({}, array);
                            this.removeUser(bookKey, newObject);
                        }
                    }
                }
            })
        })
     },

     methods:{
         removeUser(key, WaitList){
             AppDB.ref('Books/' + key +"/").update({WaitList});
         }
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
