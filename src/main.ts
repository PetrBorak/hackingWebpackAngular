import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import AppModule from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

debugger;
AppModule.then((appModule) => {
  debugger;
    platformBrowserDynamic().bootstrapModule(appModule.AppModule)
      .catch(err => console.error(err));
});
