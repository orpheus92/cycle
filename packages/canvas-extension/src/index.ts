
import {
  JupyterLabPlugin
} from '@jupyterlab/application';

import {CycleContentPlugin} from './nb_content_plugin';
import {CycleCanvasPlugin} from './plugin';

const plugins: JupyterLabPlugin<any>[] = [CycleCanvasPlugin, CycleContentPlugin];
export default plugins;
