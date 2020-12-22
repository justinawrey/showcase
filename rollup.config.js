import appConfig from './config/app.config';
import componentsConfig from './config/components.config';
const production = !process.env.ROLLUP_WATCH;

const configs = [appConfig];
if (!production) {
	configs.push(componentsConfig);
}

export default configs;
