
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
<v-btn class ="button"  v-if="!isAdmin && bookCount" v-on:click="checkOutBook" > Check out this book </v-btn>
<v-btn class ="button"  v-if="!bookCount"   v-on:click="waitListFunction" > Waiting list </v-btn>

<h1  v-if="!bookCount" > OUT OF STOCK</h1>

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
            userFullEmail:null,
            isAdmin: false,
            noStock:false,
            waitList:null,
            userWaitList:[],
            askIfExists:false,
            
            
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
                alert("Due Date: " + date);
                location.reload();
              }

          }

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
                          alert("You are already in Waiting List");
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