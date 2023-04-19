import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('package.json', { encoding: 'utf8' }))
const libName = 'mdtimepicker'
const outputJs = `${libName}.js`

let plugins = [
    babel({
        exclude: /node_modules/,
        babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs()
]

export default {
    input: `src/${libName}.js`,
    output: {
        file: `dist/${outputJs}`,
        format: 'umd',
        name: libName,
        banner: `/*!DO NOT REMOVE!\n * MDTimePicker ${pkg.version} plugin\n * ${pkg.homepage}\n *\n * Author: ${pkg.author.name}\n * Email: ${pkg.author.email}\n */`
    },
    plugins: plugins
}