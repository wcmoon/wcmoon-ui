const fs = require('fs-extra');
const path = require('path');
import svelte from 'rollup-plugin-svelte';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import wcmoonUI from './rollup-plugin-wcmoon-ui/index';
import pkg from './package.json';


function isDir(dir) {
	return fs.lstatSync(dir).isDirectory();
}

const packages = {};
const dir = path.join(__dirname, './packages');
const files = fs.readdirSync(dir);
files.forEach(file => {
	const absolutePath = path.join(dir, file);
	if (isDir(absolutePath)) {
		packages[file] =`packages/${file}/index.js`;
	}
});

const allScript = `${pkg.name}.all`
packages[allScript] = `packages/index.js`;

function createRollupConfig(file, name) {
	return {
		// input: 'src/index.js',
		input: file,
		output: [
			{file: name === allScript ? `lib/index.js` : `lib/${name}/index.js`,
				'format': 'es', name: name, sourcemap: true},
			// {file: `lib/${name}/index.js`, 'format': 'umd', name}
		],
		plugins: [
			svelte({
				compilerOptions: {
					customElement: true,
				}
			}),
			commonjs({
				include: ['node_modules/**', '*/node_modules/**'],  // Default: undefined
				extensions: ['.js', '.coffee'],  // Default: [ '.js' ]
				ignoreGlobal: false,  // Default: false
				sourceMap: false,  // Default: true
				ignore: ['conditional-runtime-dependency']
			}),
			wcmoonUI(),
			//
			//
			resolve(),
		]
	}
};

const buildPackages = []
for (let name in packages) {
	const file = packages[name]
	buildPackages.push(createRollupConfig(file, name))
}

export default buildPackages;
