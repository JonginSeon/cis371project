<template>
   
   
 <v-app id="inspire">
    <v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex >
            <v-card class="elevation-12">
              
            <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Available Books</v-toolbar-title>     <v-spacer></v-spacer> 
                   
                    </v-toolbar>

   
   
   
   
    <v-simple-table>
        <v-container class="table">
       
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


    </v-simple-table>

    <v-alert type="success" v-if="alertForOutOfStock"> 
  {{bookName}} is back stock
    </v-alert>


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
                <v-toolbar-title>Your Checked Out Books</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>


   <v-simple-table>

  <v-container class="table">
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
        <!-- <router-link to="/new" class="router"><v-icon>mdi-plus-circle</v-icon></router-link> -->
    
    </v-container>

    </v-simple-table>

    <v-container v-if="alertForPastDue" >           
  <v-alert type="error"  v-for="book in pastDueBooks" v-bind:key="book.id"> 
{{book}} is past due return it now 
    </v-alert>
</v-container>
    
  <v-alert type="error" v-if="alertForDueToday"> 
  {{dueToday}} is due today
    </v-alert>




     </v-card>
          </v-flex>
        </v-layout>
      </v-container>  
    </v-content>

  </v-app>
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
            userList:'',
            alertForDueToday:false,
            alertForPastDue:false,
            pastDueBooks:[],
            dueToday:'',
            pastDue:'',
            bookName:'',
            alertForOutOfStock:false
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
            if(data ==null){
                //alert("nothing");
                return;
            }
            const keys = Object.keys(data);
            
         
            keys.forEach((key) => {
                let book = data[key];
                //console.log("Due Date: " + book.dueDate);
                let dueDate = new Date(book.dueDate);
                let todaysDate = new Date();
                let Difference_In_Time = todaysDate.getTime() - dueDate.getTime();
                let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

                if(Difference_In_Days > 0){
                   this.alertForPastDue = true;
                   this.pastDue = book.title;
                   this.pastDueBooks.push(book.title);
                    // alert(book.title + " is past due");
                }
                if(Difference_In_Days === 0){
                   this.dueToday = book.title;
                    this.alertForDueToday = true;
                  //  alert(book.title + " is due today");
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

                         
                            let bookKey = key;
                            let index = array.indexOf(firebase.auth().currentUser.email);
                            array.splice(index, 1);
                            // console.log(array);'
                            if(book.bookCount !=0){ 
                                // alert("pass");
                                this.bookName = book.title;
                                this.alertForOutOfStock=true;
                                //alert(book.title + " is back in stock");
                            let newObject = Object.assign({}, array);
                            this.removeUser(bookKey, newObject);
                        }
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