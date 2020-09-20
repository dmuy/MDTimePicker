import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const libName = 'mdtimepicker',
    outputJs = `${libName}.js`

let plugins = [
    resolve(),
    babel({ babelHelpers: 'bundled' })
]

export default {
    input: `src/${libName}.js`,
    output: {
        file: `dist/${outputJs}`,
        format: 'umd',
        name: libName,
        banner: "/*!DO NOT REMOVE!\n * MDTimePicker v2.0 plugin\n * https://github.com/dmuy/MDTimePicker\n *\n * Author: Dionlee Uy\n * Email: dionleeuy@gmail.com\n */"
    },
    plugins: plugins
}