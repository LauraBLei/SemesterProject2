import './css/style.css';

import router from './ts/router/router';

await router(window.location.pathname);

console.log('hello from main.ts');
