import './css/style.css';

import router from './ts/router/router';
import { MakeHeader } from './ts/ui/global/header';

MakeHeader();
await router(window.location.pathname);
