const copy = require('rollup-plugin-copy');
const rpts2 = require('rollup-plugin-typescript2');
const images = require('@rollup/plugin-image');
const svg = require('rollup-plugin-svg');
const path = require('path');
const fs = require('fs');
const dynamicTargets = require('./rollup-plugin-dynamic-targets');
const virtual = require('@rollup/plugin-virtual');

// function makeFlags () {
//   const targetDir = path.join(__dirname, 'flags');
//   const files = fs.readdirSync(targetDir);
//   const objectEntries = files.map(
//     file => `  '${file}': () => import('${path.join(targetDir, file)}')`
//   );
//   return `export default {\n${objectEntries.join(',\n')}\n};`;
// }

module.exports = {
  rollup (config) {
    // config.plugins.unshift({
    //   name: 'plugin-test-module',
    //   resolveId (id) {
    //     console.log('resolveId', id);

    //     if (id === 'testmodule') {
    //       return id;
    //     }

    //     return null;
    //   },
    //   transform (code, id) {
    //     console.log('transform', code, id);
    //   },
    //   load (id) {
    //     if (id === 'testmodule') {
    //       return 'export default "Test is successful"';
    //     }

    //     return null;
    //   },
    // });

    return config;
  },
};

// module.exports = {
//   rollup (config, options) {
//     // config.plugins = config.plugins.map(plugin => {
//     //   if (plugin && plugin.name === 'rpt2') {
//     //     return rpts2({
//     //       // properties that I added for demonstration purposes
//     //       clean: true,
//     //       objectHashIgnoreUnknownHack: true,
//     //       // properties in the current internal implementation of tsdx
//     //       typescript: require('typescript'),
//     //       cacheRoot: `./.rts2_cache_${options.format}`,
//     //       tsconfig: options.tsconfig,
//     //       tsconfigDefaults: {
//     //         compilerOptions: {
//     //           sourceMap: true,
//     //           declaration: true,
//     //           jsx: 'react',
//     //         },
//     //       },
//     //       tsconfigOverride: {
//     //         compilerOptions: {
//     //           target: 'esnext',
//     //         },
//     //       },
//     //     });
//     //   }

//     //   return plugin;
//     // });

//     config.plugins = [
//       // images({ include: ['**/*.svg'] }),
//       ...config.plugins,
//       {
//         // this is necessary to tell rollup that it should not try to resolve "dynamic-targets"
//         // via other means
//         resolveId (id) {
//           if (id === 'dynamic-targets') {
//             return id;
//           }
//           return null;
//         },

//         // create a module that exports an object containing file names as keys and
//         // functions that import those files as values
//         load (id) {
//           if (id === 'dynamic-targets') {
//             const targetDir = path.join(__dirname, 'dynamic');
//             const files = fs.readdirSync(targetDir);
//             const objectEntries = files.map(
//               file =>
//                 `  '${file}': () => import('${path.join(targetDir, file)}')`
//             );
//             return `export default {\n${objectEntries.join(',\n')}\n};`;
//           }
//           return null;
//         },
//       },
//       // copy({
//       //   targets: [
//       //     {
//       //       src: 'src/flags/**/*',
//       //       dest: 'dist/flags',
//       //     },
//       //     {
//       //       src: 'node_modules/i18n-iso-countries/langs/*',
//       //       dest: 'dist/langs',
//       //     },
//       //   ],
//       // }),
//       // svg({ base64: true }),
//     ];

//     return config;
//   },
// };

// config.plugins = [images({ include: ['**/*.svg'] }), ...config.plugins];
// config.plugins = [...config.plugins, svg({ base64: true })];
// config.plugins.unshift(
//   typescript({
//     typescript: require('typescript'),
//     objectHashIgnoreUnknownHack: true,
//   })
// );
