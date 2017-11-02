
import {
  JupyterLabPlugin, JupyterLab
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookPanel, INotebookModel,
} from '@jupyterlab/notebook';

import {
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  Token
} from '@phosphor/coreutils';

import {
  IDisposable, DisposableDelegate
} from '@phosphor/disposable';

import {
  Manager, CycleCanvas
} from '@cycle/canvas';

export
const ICycleCanvasExtension = new Token<ICycleCanvasExtension>('cycle.extension.canvas');

export
interface ICycleCanvasExtension extends DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
}

export
class CycleCanvasExtension implements ICycleCanvasExtension {
  constructor(app: JupyterLab) {
    this._app = app;
  }

  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    console.log('CycleCanvasExtension:createNew');
    let manager = new Manager(panel, context);

    this.addCanvasButton(panel, context);

    return new DisposableDelegate(() => {
      manager.dispose();
    });
  }

  addCanvasButton(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {
    let callback = () => { this.showCanvas(); }

    let button = new ToolbarButton({
       className: 'cycle-notebook-canvas-button',
       onClick: callback,
       tooltip: 'Canvas'
     });

     let i = document.createElement('i');
     i.classList.add('fa', 'fa-bar-chart-o');
     button.node.appendChild(i);

     panel.toolbar.insertItem(0, 'canvas', button);
     return new DisposableDelegate(() => {
       button.dispose();
     });
  }

  showCanvas() {
    let canvas = this._canvas = this._canvas || new CycleCanvas();
    if (!canvas.isAttached) {
      this._app.shell.addToMainArea(canvas);
    }
    this._app.shell.activateById(canvas.id);
  }

  private _canvas : CycleCanvas = null;
  private _app: JupyterLab;
}

export
const CycleCanvasPlugin: JupyterLabPlugin<ICycleCanvasExtension> = {
  id: 'cycle.extension.canvas',
  provides: ICycleCanvasExtension,
  requires: [ICommandPalette],
  activate: activateCanvasExtension,
  autoStart: true
}

function activateCanvasExtension(app: JupyterLab, palette: ICommandPalette): ICycleCanvasExtension {
  let extension = new CycleCanvasExtension(app);
  app.docRegistry.addWidgetExtension('Notebook', extension);
  return extension;
}
