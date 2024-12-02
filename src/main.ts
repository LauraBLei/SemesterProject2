import './css/style.css';

import router from './ts/router/router';
import { createAndEditContainer } from './ts/router/views/listingCreateEdit';
import { MakeHeader } from './ts/ui/global/header';

createAndEditContainer();
MakeHeader();
await router(window.location.pathname);
