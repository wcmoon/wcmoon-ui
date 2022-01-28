import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import {resolve} from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
		vite: {
			resolve: {
				alias: {
					$packages: resolve('src/../../packages')
				}
			}
		}
	}
};
// console.log()

export default config;
