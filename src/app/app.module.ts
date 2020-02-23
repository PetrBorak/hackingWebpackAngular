import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import  { AppComponent }  from './app.component';
import { dynamicPlugins } from './dynamicPlugins';

export default Promise.all(dynamicPlugins).then((plugins) => {
  debugger;
  //@ts-ignore
   const pluginMember = __webpack_require__(plugins[0].module);

    debugger;
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        pluginMember[plugins[0].export].NgStickyHeaderModule,
        BrowserModule,
        AppRoutingModule
      ],
      providers: [{
        provide: plugins[0].injectionToken,
        useValue: pluginMember[plugins[0].export]
      }],
      bootstrap: [AppComponent]
    })
    class AppModule { }
    return {
      AppModule
    };


})
