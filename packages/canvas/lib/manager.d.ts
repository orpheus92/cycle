import { DocumentRegistry } from '@jupyterlab/docregistry';
import { Kernel } from '@jupyterlab/services';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { IDisposable } from '@phosphor/disposable';
export declare class Manager implements IDisposable {
    constructor(nb: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>);
    newKernel(kernel: Kernel.IKernelConnection): void;
    readonly context: DocumentRegistry.IContext<INotebookModel>;
    readonly isDisposed: boolean;
    dispose(): void;
    private _nb;
    private _context;
}
