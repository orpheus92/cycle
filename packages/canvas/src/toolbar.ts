
import {
  PanelLayout,
  Widget,
} from '@phosphor/widgets';

const SPACER_CLASS = 'cycle-spacer';
const TOOLBAR_CLASS = 'cycle-toolbar';
const BUTTON_CLASS = 'cycle-button';
const TOGGLE_PRESSED = 'cycle-button-toggle-pressed';

export
class Spacer extends Widget {
  constructor() {
    super();
    this.addClass(SPACER_CLASS);
  }
}

function createElement(type:string, classes: string) {
  let el = document.createElement(type);
  for (let cls of classes.split(/\s/)) {
    el.classList.add(cls);
  }
  return el;
}

export
class CycleButton extends Widget {
  constructor(options: CycleButton.IOptions = {}) {
    super({node:document.createElement('div')});
    this.addClass(BUTTON_CLASS);
    let icon = options.icon && options.icon != '' ? options.icon : '';
    if (Array.isArray(icon) == false) {
      this.node.appendChild(createElement('i', icon));
    } else {
      let stack = createElement('span', icon[0]);
      for (let i=0; i<icon.length; i++) {
        stack.appendChild(createElement('i', icon[i]));
      }
      this.node.appendChild(stack);
    }
    this.node.title = options.tooltip || '';
  }

  on(type:string, cb: (event:Event) => void): CycleButton {
    if (cb)
      this.node.addEventListener(type, cb);
    return this;
  }
}

export
class CycleToggleButton extends CycleButton {
  constructor(options:CycleToggleButton.IOptions) {
    super(options);
    this.on('click', () => this.toggle());
  }

  toggle(state?:string) {
    console.log('toggle', this, this._pressed);
    let op = state == 'on' ? true
      : state == 'off' ? false : !this._pressed;
    console.log('op:', op);
    if (op != this._pressed) {
      if (op) this.node.classList.add(TOGGLE_PRESSED);
      else this.node.classList.remove(TOGGLE_PRESSED);
      this._pressed = op;
    }
    return this;
  }

  private _pressed: boolean = false;
}

export
class CycleToolbar extends Widget {
  constructor() {
    super();
    this.addClass(TOOLBAR_CLASS);
    this.layout = new PanelLayout();
  }

  addItem(widget: Widget): CycleToolbar {
    let layout = this.layout as PanelLayout;
    layout.addWidget(widget);
    return this;
  }
}

export
namespace CycleButton {
  export interface IOptions {
    icon?: string;
    tooltip?: string;
  }
}

export
namespace CycleToggleButton  {
  export interface IOptions extends CycleButton.IOptions {
  }
}
