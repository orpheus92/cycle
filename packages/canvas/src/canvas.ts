import {
    ServerConnection
} from '@jupyterlab/services';

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

import '../style/index.css';

import * as d3 from 'd3';
import {event as d3event} from 'd3';

const JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';

export
class CycleCanvas extends Widget {
  constructor() {
    super();

    this.settings = ServerConnection.makeSettings();

    console.log('new CycleCanvas');
    this.id = 'cyclus-canvas';
    this.title.label = 'canvas';;
    this.title.closable = true;
    this.addClass('cyclus-canvas');

    // See if we can put image in the middle
      this.img = document.createElement('img');
      this.img.className = 'jp-xkcdCartoon';
      this.node.appendChild(this.img);

      this.img.insertAdjacentHTML('afterend',
          `<div class="jp-xkcdAttribution">
        <a href="https://creativecommons.org/licenses/by-nc/2.5/" class="jp-xkcdAttribution" target="_blank">
          <img src="https://licensebuttons.net/l/by-nc/2.5/80x15.png" />
        </a>
      </div>`
      );

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
    console.log('items:', items); //print dragged item
    for (let item of items) {
      if (item.cell_type == 'code') {
        console.log('code:', item);  //print dragged code
      }
    }
    //let widgets = event.mimeData.getData('internal:cells');
  }

    // let values = event.mimeData.getData(JUPYTER_CELL_MIME);

    /**
     * The server settings associated with the widget.
     */
    readonly settings: ServerConnection.ISettings;

    /**
     * The image element associated with the widget.
     */
    readonly img: HTMLImageElement;

    /**
     * Handle update requests for the widget.
     */
    onUpdateRequest(msg: Message): void {
        ServerConnection.makeRequest({url: 'https://egszlpbmle.execute-api.us-east-1.amazonaws.com/prod'}, this.settings).then(response => {
            this.img.src = response.data.img;
            this.img.alt = response.data.title;
            this.img.title = response.data.alt;
        });
    }
}

class
CanvasItem {
  constructor(cell: nbformat.ICell) {

  }
}
