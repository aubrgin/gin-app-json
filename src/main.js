import App from './components/App.vue';
import ginFs from '@aubrgin/gin-fs';
import fs from 'fs';
import Vue from 'vue';

if (process.env.NODE_ENV !== 'production') {
  new Vue({
    render: (h) => h(App),
  }).$mount('#app');

  function injectCss(css) {
    var linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(css));
    document.getElementsByTagName('head')[0].appendChild(linkElement);
  }

  injectCss(fs.readFileSync(`${ginFs.ginPath}/${ginFs.getConfig('theme', 'gin')}`));
  injectCss(fs.readFileSync('node_modules/@aubrgin/gin-components/dist/@aubrgin/gin-components.css'));
}




export default App;
