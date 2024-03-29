// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';
import './components/firebaseInit';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false



firebase.auth().onAuthStateChanged(() => {
 
  
  new Vue({
    render : h => h(App),
    vuetify,
    router
  }).$mount("#app");

    
});
