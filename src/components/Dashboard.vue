<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header">
                <h4>Books</h4>
            </li>
            <li v-for="book in books" v-bind:key="book.id" class="collection-item">
                <div class="chip">{{book.genre}}</div>{{book.title}} - {{book.author}}

                <router-link class="secondary-content" v-bind:to="{name: 'view-book', params: {book_id: book.ID}}">
                    <i class="fa fa-eye"></i>
                </router-link>
            </li>
        </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
                <i class="material-icons">library_add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import { AppDB } from './firebaseInit'
export default {
    name: 'dashboard',
    data(){
        return{
            books: []
        }
    },
    created(){
        AppDB.ref('Books').on('value', (snapshot) => {
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
    }
}
</script>
