import Vue from "vue";
import Router from "vue-router";

import Login from './views/Login.vue';
import Chat from './views/Chat.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path:"/chat",
      name:"Chat",
      component:Chat,
      props:true,
      beforeEnter(to, from, next){
        if(to.params.name){ //If the user not have loged in with a name which we send (  $router.push({name:'Chat',params:{name:this.name}}) ) from the Login.vue to take the user to the /chat route
          next();
        }else {
          next({name:'Login'});
        }
      }
    }
  ]
});
