import { CellHeader, CellFooter } from '@jupyterlab/cells';
import { CycleToolbar } from './toolbar';
export declare class CycleCellHeader extends CellHeader {
    constructor();
    readonly toolbar: CycleToolbar;
    readonly _toolbar: CycleToolbar;
}
export declare class CycleCellFooter extends CellFooter {
    constructor();
    readonly toolbar: CycleToolbar;
    readonly _toolbar: CycleToolbar;
}
