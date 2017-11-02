import { Widget } from '@phosphor/widgets';
export declare class Spacer extends Widget {
    constructor();
}
export declare class CycleButton extends Widget {
    constructor(options?: CycleButton.IOptions);
    on(type: string, cb: (event: Event) => void): CycleButton;
}
export declare class CycleToggleButton extends CycleButton {
    constructor(options: CycleToggleButton.IOptions);
    toggle(state?: string): this;
    private _pressed;
}
export declare class CycleToolbar extends Widget {
    constructor();
    addItem(widget: Widget): CycleToolbar;
}
export declare namespace CycleButton {
    interface IOptions {
        icon?: string;
        tooltip?: string;
    }
}
export declare namespace CycleToggleButton {
    interface IOptions extends CycleButton.IOptions {
    }
}
