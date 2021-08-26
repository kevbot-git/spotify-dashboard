import { createApp } from 'vue';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue';
import { store } from './store';
import router from './router'

faLibrary.add(faSpotify);

createApp(App)
  .use(store)
  .use(router)
  .component('Icon', FontAwesomeIcon)
  .mount('#app');
