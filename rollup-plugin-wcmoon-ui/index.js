'use strict';

export default function () {
  return {
    name: 'wcmoonUI',
    transform(code, id) {
      let codeStr = `${code}`;
      let extend = `${id}`;
      if (extend.split('.').pop() !== 'svelte') return;
      const matchList = codeStr.match(/customElements.define\(\"(\S*)\",(\s*)(\S*)\);/);
      const name = matchList?.length >= 1 && matchList[1];
      const sourceName = matchList?.length >= 1 && matchList[3];
      codeStr = codeStr.replace(/customElements.define[\s\S]*\);/, `
        if(!window.wcmoonUI) {window.wcmoonUI = {}};
        if(!window.wcmoonUI['${name}']) {
          customElements.define("${name}", ${sourceName});
          window.wcmoonUI['${name}'] = true;
        }
      `)
      return codeStr;
    }
  }
}
