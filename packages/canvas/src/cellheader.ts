
import {
  CellHeader, CellFooter
} from '@jupyterlab/cells';

import {
  PanelLayout
} from '@phosphor/widgets';

import {
  CycleToolbar
} from './toolbar';

const CELL_HEADER_CLASS = 'cycle-cell-header';
const CELL_FOOTER_CLASS = 'cycle-cell-footer';

export
class CycleCellHeader extends CellHeader {
  constructor() {
    super();
    this.addClass(CELL_HEADER_CLASS);
    let layout = this.layout = new PanelLayout();
    this._toolbar = new CycleToolbar();
    layout.addWidget(this._toolbar);
  }

  get toolbar() { return this._toolbar; }

  readonly _toolbar: CycleToolbar;
}

export
class CycleCellFooter extends CellFooter {
  constructor() {
    super();
    this.addClass(CELL_FOOTER_CLASS);
    let layout = this.layout = new PanelLayout();
    this._toolbar = new CycleToolbar();
    layout.addWidget(this._toolbar);
  }

  get toolbar() { return this._toolbar; }

  readonly _toolbar: CycleToolbar;
}
