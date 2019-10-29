<template>
    <div id="view-book">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>{{title}}</h4>
                <li class="collection-item">Book ID: {{ID}}</li>
                <li class="collection-item">Author: {{author}}</li>
                <li class="collection-item">Genre: {{genre}}</li>
                <li class="collection-item">Date of Publication: {{published}}</li>
                <li class="collection-item">Stock: {{bookCount}}</li>
        </ul>
        <router-link to="/" class="btn grey"> Back </router-link>
        <button @click="deleteBook" class="btn red"> Delete </button>
    </div>
</template>

<script>
import {AppDB} from './firebaseInit'
export default {
    name: 'view-book',
    data(){
        return{
            ID: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null
        }
    },
    beforeRouteEnter(to, from, next){
        AppDB.ref('Books').on('value', (snapshot) => {
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
                this.$router.push("/");
            }
        }      
    }
}
</script>
