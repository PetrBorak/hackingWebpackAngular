const importReg = /import[\s]*({[^}]*} | [^}]*)[\s]*from[\s]*([^\s;]*)/g
const importRegOne = /import[\s]*{*([^}]*)}*[\s]*from[\s]*\'([^\s;\']*)/
const relativeImport  = /from[\s]*(\.\.{0,1}\/)/;

export const parseImports = (maps) => (txt: string) => {
  const imports = txt.match(importReg);
  imports.forEach((importParsed) => {
    const relative = relativeImport.test(importParsed);
    if(!relative){
      let finalReq = '';
      let oneByOne = importParsed.match(importRegOne);
      let module = importParsed.match(importRegOne)[2]
      let reqs = oneByOne[1].split(',')
      reqs = reqs.map((item) => item.trim());
      reqs.forEach((item) => {
        finalReq += `const ${item} = __webpack_require__('${maps[module]}').${item}; \n`
      })
      txt = txt.replace(importParsed, finalReq)
    }
  })
  return txt;
}
