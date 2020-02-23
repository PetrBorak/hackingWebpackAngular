import {environment} from "src/environments/environment";
import { InjectionToken } from '@angular/core';
import { compose } from 'ramda'

import { handleTokens } from './tokens';
import { parseImports } from './moduleImportParser';
import { turnExportsIntoReturn } from './moduleExportParser';
import { makeMaps } from './detectImportMapper';
import { Task } from './functionalHelpers/Task'

const dynamicPluginsPath = environment.dynamicPluginsPath
const innerBody = (path, response) => {
  return fetch('vendor.js').then((responseVendor) => {
    return responseVendor.text().then((textVendor) => {
      const webpackMaps = makeMaps(textVendor);
      debugger

      return response.text().then((text) => {
        (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["hackyHack"], {
          [path.member]: function (module, __webpack_exports__, __webpack_require__) {
            debugger
            __webpack_require__.d(
              __webpack_exports__, "HackedAppComponent", function () {
                return topass;
              }
            )


            debugger;
            let topass = null;
            const parsed = turnExportsIntoReturn('topass')(parseImports(webpackMaps)(text));
            eval(parsed.txt);
            // const getTheResultToExport = eval(parsed.returns)
          }
        }])

        const injectionToken = new InjectionToken<any>('app.test')
        handleTokens(injectionToken);

        return {
          export: "HackedAppComponent",
          module: path.member,
          injectionToken
        };
      })
    })
  })
}

const getPlugins = (path) => new Task((reject, resolve) => {
  return fetch(path.path).then((response) => {
    resolve(response)
  })
})

export const dynamicPlugins =
  dynamicPluginsPath.map(getPlugins).map()

// export const dynamicPlugins =
//     dynamicPluginsPath.map((path) => {
//       return fetch(path.path).then((response) => {
//         return innerBody(path, response)
//       })
//     })

