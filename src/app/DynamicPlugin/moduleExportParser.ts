const exportsRegGlobal = /export([\s]+{*[\s]*[^}]*[\s]*}*)/g
const exportsReg = /([^\s,]*)/

export const turnExportsIntoReturn = (topass) => (txt) => {
  let exports = txt.match(exportsRegGlobal)
  let returns = '{'
  exports = exports.map((item) => item.replace(/export[\s{]*/, '').split(',').map((itemInner) => itemInner.trim().match(exportsReg)[1]))
  exports.forEach((exportsParsed) => {
      returns += exportsParsed.join(',')
      returns += ','
    })
  returns = returns.substring(0,returns.length -1);
  returns += '}'
  txt = txt.replace(/export([\s]+{*[\s]*[^}]*[\s]*}*)/, '')
  txt = `${txt} \n; ${topass} = ${returns}`
  return {
    txt,
    returns
  }
}
