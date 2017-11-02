

import {
  JupyterLabPlugin, JupyterLab
} from '@jupyterlab/application';

import {
  IEditorServices
} from '@jupyterlab/codeeditor';

import {
  NotebookPanel, Notebook
} from '@jupyterlab/notebook';

import {
  ICellHeader, CodeCell
  // ICellFooter
} from '@jupyterlab/cells'

import {
  CycleToggleButton,
  CycleCellHeader,
  // CycleCellFooter,
} from '@cycle/canvas';

const FORWARD_ICON_CLASS = 'fa fa-mail-forward';

class CycleContentFactory extends NotebookPanel.ContentFactory {
 createNotebook(options: Notebook.IOptions): Notebook {
   console.log('CycleContentFactory:createNew');
   this._nb = super.createNotebook(options);
   return this._nb;
 }

 createCodeCell(options: CodeCell.IOptions, parent: Notebook): CodeCell {
   let cell = super.createCodeCell(options, parent);
   cell.outputArea.model.changed.connect( (model, data) => {
    console.log('output model changed', model, data);
    });

   cell.outputArea.outputLengthChanged.connect((sender,data) => {
     console.log('output length changed:', data);
   })
   return cell;
 }

 createCellHeader(): ICellHeader {
   let forward = new CycleToggleButton({
     icon: FORWARD_ICON_CLASS,
     tooltip: "Forward the cell output"
   });
   forward.on('click', (event) => console.log('forward clicked'));

   let header = new CycleCellHeader();
   header.toolbar.addItem(forward);
   return header;
 }

 // createCellFooter(): ICellFooter {
 //   console.log('create footer');
 //   let forward = new CycleToggleButton({
 //     icon: FORWARD_ICON_CLASS,
 //     tooltip: "Forward the cell output"
 //   });
 //   forward.on('click', (event) => console.log('forward clicked'));
 //
 //   let footer = new CycleCellFooter();
 //   footer.toolbar.addItem(forward);
 //   return footer;
 // }
 private _nb: Notebook;
}

export
const CycleContentPlugin: JupyterLabPlugin<NotebookPanel.IContentFactory> = {
  id: 'cycle.extension.notebook-factory',
  provides: NotebookPanel.IContentFactory,
  requires: [IEditorServices],
  autoStart: true,
  activate: (app: JupyterLab, editorServices: IEditorServices) => {
    console.log('@cycle/notebook-extension:factory');
    let editorFactory = editorServices.factoryService.newInlineEditor.bind(
      editorServices.factoryService);
    return new CycleContentFactory({ editorFactory });
  }
};
