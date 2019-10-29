<template>
    <div id="new-book">
        <h3>New Library Addition</h3>
        <div class="row">
            <form @submit.prevent="saveBook" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="book_id" required>
                        <label>Book ID</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="title" required>
                        <label>Title</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="author" required>
                        <label>Author</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="published" required>
                        <label>Date Published</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="genre" required>
                        <label>Genre</label>
                    </div>
                </div>
                 <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="bookCount" required>
                        <label>Stock</label>
                    </div>
                </div>
                <button type="submit" class="btn green">Submit</button>
                <router-link to="/" class="btn red">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import {AppDB} from './firebaseInit'
export default {
    name: 'new-book',
    data(){
        return{
            book_id: null,
            title: null,
            author: null,
            genre: null,
            published: null,
            bookCount: null
        }
    },
    methods: {
        saveBook(){
            AppDB.ref('Books').push().set({
                ID: this.book_id,
                title: this.title,
                author: this.author,
                genre: this.genre,
                published: this.published,
                bookCount: this.bookCount
            })
            .then(() => { this.$router.push('/') })
            .catch(error => console.log(error))
        }
    }
}
</script>