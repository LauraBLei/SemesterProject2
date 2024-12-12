import './css/style.css';

import router from './ts/router/router';
import { createAndEditContainer } from './ts/router/views/listingCreateEdit';
import { MakeHeader } from './ts/ui/global/components/header';
import {
  hideLoader,
  initializeGlobalLoader,
  showLoader,
} from './ts/ui/global/components/loader';

initializeGlobalLoader();
showLoader();
MakeHeader();
createAndEditContainer();
await router(window.location.pathname);

hideLoader();
