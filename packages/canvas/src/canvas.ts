import {
  Message
} from '@phosphor/messaging';

import {
  nbformat
} from '@jupyterlab/coreutils';

import {
  Widget
} from '@phosphor/widgets';

import {
  Drag, IDragEvent
} from '@phosphor/dragdrop';

import * as d3 from 'd3';
import {event as d3event} from 'd3';

const JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';

export
class CycleCanvas extends Widget {
  constructor() {
    super();

    console.log('new CycleCanvas');
    this.id = 'cyclus-canvas';
    this.title.label = 'canvas';;
    this.title.closable = true;
    this.addClass('cyclus-canvas');

    d3.select(this.node)
      .on('p-dragenter', this.dragEnter)
      .on('p-dragleave', this.dragLeave)
      .on('p-dragover', this.dragOver)
      .on('p-drop', this.dragDrop);
  }

  dragEnter() {
    if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }

  dragLeave() {
    if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }

  dragOver() {
    if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    d3.event.preventDefault();
    d3.event.stopPropagation();
    d3.event.dropAction = d3.event.proposedAction;
  }

  dragDrop() {
    let event = d3.event;
    if (!event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (event.proposedAction === 'none') {
      event.dropAction = 'none';
      return;
    }
    event.dropAction = 'copy';
    let items : [nbformat.ICell]= event.mimeData.getData(JUPYTER_CELL_MIME);
    console.log('items:', items);
    for (let item of items) {
      if (item.cell_type == 'code') {
        console.log('code:', item);
      }
    }
    //let widgets = event.mimeData.getData('internal:cells');
  }

    // let values = event.mimeData.getData(JUPYTER_CELL_MIME);
}

class
CanvasItem {
  constructor(cell: nbformat.ICell) {

  }
}
