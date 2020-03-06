// rollup-plugin-my-example.js
module.exports = function myExample () {
  return {
    // this is necessary to tell rollup that it should not try to resolve "dynamic-targets"
    // via other means
    resolveId (id) {
      if (id === 'dynamic-targets') {
        return id;
      }
      return null;
    },

    // create a module that exports an object containing file names as keys and
    // functions that import those files as values
    load (id) {
      if (id === 'dynamic-targets') {
        const targetDir = path.join(__dirname, 'dynamic');
        const files = fs.readdirSync(targetDir);
        const objectEntries = files.map(
          file => `  '${file}': () => import('${path.join(targetDir, file)}')`
        );
        return `export default {\n${objectEntries.join(',\n')}\n};`;
      }
      return null;
    },
  };
};
