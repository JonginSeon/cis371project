
<template>

 <v-app id="inspire" >
    <v-content >
      <v-container >
        <v-layout align-center justify-center>
      
            <v-card id="vCard" class="elevation-12" width="450" >

               <v-toolbar class ="toolbar" color="primary" dark flat>
                <v-toolbar-title id ="title"> Your {{title}}  Information </v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>



  <!-- <v-card  id="card" class="mx-auto" max-width="400" tile> -->
    <v-list-item class ="vList">
      <v-list-item-content>
        <v-list-item-title>Book ID:  {{ID}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

        <v-list-item two-line class ="vList">
      <v-list-item-content>
        <v-list-item-title>Title:  {{title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    

    <v-list-item three-line class ="vList">
      <v-list-item-content>
        <v-list-item-title>Author: {{author}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item four-line class ="vList">
      <v-list-item-content>
        <v-list-item-title>Genre: {{genre}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>


    <v-list-item five-line class ="vList">
      <v-list-item-content>
        <v-list-item-title>Due Date: {{dueDate}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
      <br>
<router-link to="/" class="router"><v-btn class ="button">  Back </v-btn></router-link>



<v-btn class ="button" @click.stop="dialog = true"  > Return Book </v-btn>



  
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Comfirm</v-card-title>

        <v-card-text>
       Are you sure you want to return this book?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false"> No </v-btn>
          <v-btn color="green darken-1" text  dark v-on="on"    v-on:click="returnBook" >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </v-card>



        </v-layout>
      </v-container>  
    </v-content>
  </v-app>
</template>
<script>
import {AppDB} from './firebaseInit'
import firebase from 'firebase';

export default {
    name: 'view-user-book',
    data(){
        return{
           dialog: false,
            ID: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null,
            dueDate: '',
            userList:''
        }
    },
    beforeRouteEnter(to, from, next){

     let  dialog =false; 
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
                vm.dueDate = find.dueDate;
                 vm.dialog=dialog;
            })
        })
     
    },
    methods: {
        returnBook(){
            
          if(firebase.auth().currentUser){
       
              
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
</script>
<style scoped>


#vCard{
 
}
.router{
      text-decoration: none; 
}
.button{
    margin:3%;
}

.vList{

  margin-left:3%;

}
#title{
  margin: 3%;
}
</style>