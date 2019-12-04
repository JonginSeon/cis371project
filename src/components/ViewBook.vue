
<template>
 <v-app id="inspire">
    <v-content>
      <v-container >
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">

               <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Book Information</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>


  <!-- <v-card  id="card" class="mx-auto" max-width="400" tile> -->
      
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
 <router-link to="/admin" class="router"><v-btn class ="button"  v-if="isAdmin"> Back </v-btn></router-link>
<router-link to="/" class="router"><v-btn class ="button" v-if="!isAdmin">  Back </v-btn></router-link>

<v-btn class ="button"  v-if="isAdmin" v-on:click="deleteAlert" > Delete </v-btn>


<v-btn class ="button"  v-if="!isAdmin && bookCount" v-on:click="duedate" > Check out this book </v-btn>
 

<v-btn class ="button"  v-if="!bookCount &&!isAdmin"   v-on:click="waitListAlert" > Add me to the WaitList </v-btn>

  <v-alert type="error" v-if="!bookCount"> 
  This book is currently out of stock
    </v-alert>

 <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>

        <v-card-text>
      Are you sure you want to delete this book?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog1 = false"> No </v-btn>
          <v-btn color="green darken-1" text  dark @click="deleteBook"  >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>

        <v-card-text>
       Would you like to check out this book? Your return date woud be {{date}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false"> No </v-btn>
          <v-btn color="green darken-1" text  dark      @click="checkOutBook"  >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>

        <v-card-text>
       Would you like to get notified when book is available? 
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog2 = false"> No </v-btn>
          <v-btn color="green darken-1" text  dark      @click="waitListFunction"  >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>






</v-card>
          </v-flex>
        </v-layout>
      </v-container>  
    </v-content>
  
  </v-app>
</template>
<script>
import {AppDB} from './firebaseInit'
import firebase from 'firebase';

export default {
    name: 'view-book',
    data(){
        return{
           dialog2: false,
            dialog: false,
            dialog1: false,
            ID: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null,
            user: null,
            userFullEmail:null,
            isAdmin: true,
            noStock:false,
            waitList:null,
            userWaitList:[],
            askIfExists:false,
            date:null
            
            
        }
    },
    beforeRouteEnter(to, from, next){
        let dialog = false;
        let dialog2 = false;
        let dialog1 = false;
       let date ;
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
            let userFullEmail= null;

            if(firebase.auth().currentUser){
              let currentUser = firebase.auth().currentUser.email;
              userFullEmail=currentUser;
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
                vm.userFullEmail=userFullEmail;
                vm.dialog = dialog;
                vm.dialog2 = dialog2;
                vm.dialog1 = dialog1;
                vm.date = date;
            })
        })
    },
 
    methods: {

        duedate(){
              this.dialog = true;
              this.date = new Date();
           
              this.date.setDate(this.date.getDate() + 7);

        },
        deleteAlert(){
          this.dialog1 =true;
        },
        deleteBook(){
        
           
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
            
        },
        checkOutBook(){
         
          if(this.dialog){
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
              if(newBookCount==0){

                    this.noStock=true;
                }
              });
             
              if(newBookCount < 0){
                // dont add anything
                confirm("OUT OF STOCK");
              } 
              else{

                AppDB.ref('Books/' + uID).update({bookCount: newBookCount});
                let date = new Date();
                date.setDate(date.getDate() + 7);
                AppDB.ref(this.user).push().set({ID : bookID, title: bookTitle, author: bookAuthor, genre: bookGenre, dueDate: date.toLocaleDateString('en-US')});
                // alert("Due Date: " + date);
                location.reload();
              }

          }

        },
        waitListAlert(){
          this.dialog2=true;
        },
        waitListFunction(){
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

              AppDB.ref('Books/' + uID+"/WaitList").once("value",snapshot => {

                  if (snapshot.exists()){
                    const data = snapshot.val();
                    const keys = Object.keys(data);
              
                    keys.forEach((key) => {
                      
                      let email = data[key];
                      // alert(email)

                      if(this.userFullEmail==email){
                        
                      //    alert("You are already in Waiting List");
                          this.askIfExists=true;
                      }
                      else{
                        this.userWaitList.push(email);
                          this.askIfExists=false;
                      }
                    });

                  }
              }); 

             if(this.askIfExists==false){ 
              // AppDB.ref('Books/' + uID+"/WaitList").remove();  
              this.userWaitList.push(this.userFullEmail);

                  // alert(this.userWaitList)
         
                 AppDB.ref('Books/' + uID).update({
                  WaitList: this.userWaitList
            
              })   }
              this.dialog2=false;
              //this.$router.push("/");
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