import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewBook from '@/components/NewBook'
import ViewBook from '@/components/ViewBook'
import ViewUserBook from '@/components/ViewUserBook'
import EditBook from '@/components/EditBook'
import auth from  '@/components/Auth'
import register from  '@/components/Register'
import firebase from 'firebase';
import admin from  '@/components/User'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/auth',
      name: 'auth',
      component: auth,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-book',
      component: NewBook,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:book_id',
      name: 'edit-book',
      component: EditBook,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:book_id',
      name: 'view-book',
      component: ViewBook,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/ViewCheckedOutBook',
      name: 'view-user-book',
      component: ViewUserBook,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


//Guards

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
 });
 export default router;
 