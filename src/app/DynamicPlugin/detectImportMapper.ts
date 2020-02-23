const webpackImportMaps = /\/\*\![\s]([^\s]*)[\s]\*\/[\s]*\"([^\s]*)\"/g

export const makeMaps = (txt) => {
  let maps = {};
  let found = null
  while((found = webpackImportMaps.exec(txt)) !== null){
    maps[found[1]] = found[2]
  }
  return maps
}
