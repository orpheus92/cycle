import { ServerConnection } from '@jupyterlab/services';
import { Message } from '@phosphor/messaging';
import { Widget } from '@phosphor/widgets';
import '../style/index.css';
export declare class CycleCanvas extends Widget {
    constructor();
    dragEnter(): void;
    dragLeave(): void;
    dragOver(): void;
    dragDrop(): void;
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
    onUpdateRequest(msg: Message): void;
}
