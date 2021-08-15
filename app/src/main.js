import { h, createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue'
import Stats from './Stats.vue'

const NotFoundComponent = { template: '<p>Page not found</p>' }

const routes = [
    { 
        path:'/',
        component: App
    },
    {
        path: '/stats',
        component: Stats
    }
];

const SimpleRouter = {
    data: () => ({
      currentRoute: window.location.pathname
    }),
  
    computed: {
      CurrentComponent() {
        return routes.filter(
            (route) => {
                return this.currentRoute == route.path
            })[0].component || NotFoundComponent;
      }
    },
  
    render() {
      return h(this.CurrentComponent)
    }
  }
  
  createApp(SimpleRouter).mount('#app')
