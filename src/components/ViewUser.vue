<template>
    <v-simple-table>
        <v-container class="table">
            <v-toolbar-title>Checked Out Books</v-toolbar-title>
            <br><br>
            <v-row >
                <v-col >Title</v-col>
                <v-col >Author</v-col>
            </v-row>
            <v-row v-for="book in checkedOutBooks"  v-bind:key="book.id">
                <v-col >   <v-chip >{{book.genre}}</v-chip> {{book.title}}</v-col>
                <v-col> {{book.author}}</v-col>
                <!-- <router-link class="router" v-bind:to="{name: 'view-user-book', params: {book_id: book.ID}}">
                    <v-icon>mdi-eye</v-icon></router-link>  -->
            </v-row>
            <br><br>
            <!-- <router-link to="/new" class="router"><v-icon>mdi-plus-circle</v-icon></router-link> -->
        </v-container>
</v-simple-table>


</template>

<script>
import {AppDB} from './firebaseInit'
// import firebase from 'firebase';


export default {
     name: 'view-user',
     data(){
         return{

             checkedOutBooks:[],
            currentUser: false,

         }
    },
     beforeRouteEnter(to, from, next){
            let user =   to.params.user_email.split("@");
            user= user[0];

            console.log(user);



        AppDB.ref('User/'+user).on('value', (snapshot) => {
          
            const data = snapshot.val();
                const keys = Object.keys(data);
                let arrayBooks = [];
           
                keys.forEach((key) => {
                let book = data[key];
                
                arrayBooks.push(book);

                })
                    next(vm => {
                vm.checkedOutBooks=arrayBooks;
                 console.log(vm.checkedOutBooks);
                //   console.log(vm);
              })
        });
 
     },
     created(){
//    if(firebase.auth().currentUser){
//            this.currentUser = firebase.auth().currentUser.email;
//             this.userEmail =   this.currentUser.split("@")
//             this.userList='User/'+this.userEmail[0];



//         AppDB.ref(this.userList).on('value', (snapshot) => {
//             snapshot.forEach((element) => {
//                 const data = {
//                     'title': element.val().title,
//                     'author': element.val().author,
//                     'genre': element.val().genre,
//                     'published': element.val().published,
//                     'bookCount': element.val().bookCount,
//                     'ID': element.val().ID

//                 }
               
//                 this.books.push(data);
//             })
//         })
//         }
    }
    
}
</script>