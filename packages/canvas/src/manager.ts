
import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  Kernel
} from '@jupyterlab/services';

import {
  NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

import {
  IDisposable
} from '@phosphor/disposable';

export
class Manager implements IDisposable  {
  constructor(nb: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>) {
    this._nb = nb;
    this._context = context;

    context.session.kernelChanged.connect((sender, kernel) => {
      this.newKernel(kernel);
    });

    if (context.session.kernel) {
      this.newKernel(context.session.kernel);
    }
    console.log('new manager');
  }

  newKernel(kernel: Kernel.IKernelConnection) {
  }

  get context() {
    return this._context;
  }

  get isDisposed(): boolean {
    return this._context === null;
  }

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._nb = null;
    this._context = null;
    console.log('manager disposed');
  }


  private _nb: NotebookPanel;
  private _context: DocumentRegistry.IContext<INotebookModel>;
}
