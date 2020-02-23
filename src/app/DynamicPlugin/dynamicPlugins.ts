import {environment} from "src/environments/environment";
import { InjectionToken } from '@angular/core';

import { handleTokens } from 'src/app/DynamicPlugin/tokens';
import { parseImports } from 'src/app/DynamicPlugin/moduleImportParser';
import { turnExportsIntoReturn } from 'src/app/DynamicPlugin/moduleExportParser';
import { makeMaps } from 'src/app/DynamicPlugin/detectImportMapper';
import { Task } from 'src/app/functionalUtilities/task'
import { IO } from 'src/app/functionalUtilities/IO'
import { chain, compose, map } from 'src/app/functionalUtilities/helpers'

const dynamicPluginsPath = environment.dynamicPluginsPath

const getPlugins = (path) => new Task((reject, resolve) => {
  return fetch(path.path).then((response) => {
    resolve({
      toText: response,
      path
    })
  })
})

//For now, thanks to this being hardcoded, the solution works only for develop mode run by npm run start
const getVendorScript  = (passed) => new Task((reject, resolve) => {
    return fetch('vendor.js').then((response) => {
      resolve({
        ...passed,
        toText: response
      })
    })
  })

const getTextVendors = (response: any) => new Task((reject, resolve) => {
  response.toText.text().then((responseText) => {
    resolve({
      vendorsText: responseText,
      ...response
    })
  })
})

const getTextPlugins = (response: any) => new Task((reject, resolve) => {
  response.toText.text().then((responseText) => {
    resolve({
      pluginsText: responseText,
      ...response
    })
  })
})

const makeMapsAndPass = (response) => ({
  maps: makeMaps(response.vendorsText),
  ...response
})

const addToGlobalWebpack = ({path, pluginsText, maps}) => new IO(() => {
  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["hackyHack"], {
    [path.member]: function (module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(
        __webpack_exports__, "HackedAppComponent", function () {
          return topass;
        }
      )
      let topass = null;
      const parsed = turnExportsIntoReturn('topass')(parseImports(maps)(pluginsText));
      eval(parsed.txt);
    }
  }])

  const injectionToken = new InjectionToken<any>('app.test')
  handleTokens(injectionToken);

  return {
    export: "HackedAppComponent",
    module: path.member,
    injectionToken
  }
})

const getData = compose(
  map(addToGlobalWebpack),
  map(makeMapsAndPass),
  chain(getTextVendors),
  chain(getVendorScript),
  chain(getTextPlugins),
  getPlugins
)

export const dynamicPlugins =
  dynamicPluginsPath.map(getData).map(
    (task: any) => {
      return new Promise((resolve, reject) => {
        task.fork(
          null,
          (resolved) => {
            resolve(resolved.unsafePerformIO())
          }
        )
      })
    }
  )
