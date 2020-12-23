import { module, noModule } from './config/app.config';
import components from './config/components.config';

const production = !process.env.ROLLUP_WATCH;

export default production ? [module, noModule] : [noModule, components]