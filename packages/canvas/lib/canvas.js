"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var widgets_1 = require("@phosphor/widgets");
var d3 = require("d3");
var JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';
var CycleCanvas = /** @class */ (function (_super) {
    __extends(CycleCanvas, _super);
    function CycleCanvas() {
        var _this = _super.call(this) || this;
        console.log('new CycleCanvas');
        _this.id = 'cyclus-canvas';
        _this.title.label = 'canvas';
        ;
        _this.title.closable = true;
        _this.addClass('cyclus-canvas');
        d3.select(_this.node)
            .on('p-dragenter', _this.dragEnter)
            .on('p-dragleave', _this.dragLeave)
            .on('p-dragover', _this.dragOver)
            .on('p-drop', _this.dragDrop);
        return _this;
    }
    CycleCanvas.prototype.dragEnter = function () {
        if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        d3.event.preventDefault();
        d3.event.stopPropagation();
    };
    CycleCanvas.prototype.dragLeave = function () {
        if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        d3.event.preventDefault();
        d3.event.stopPropagation();
    };
    CycleCanvas.prototype.dragOver = function () {
        if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
            return;
        }
        d3.event.preventDefault();
        d3.event.stopPropagation();
        d3.event.dropAction = d3.event.proposedAction;
    };
    CycleCanvas.prototype.dragDrop = function () {
        var event = d3.event;
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
        var items = event.mimeData.getData(JUPYTER_CELL_MIME);
        console.log('items:', items);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.cell_type == 'code') {
                console.log('code:', item);
            }
        }
        //let widgets = event.mimeData.getData('internal:cells');
    };
    return CycleCanvas;
}(widgets_1.Widget));
exports.CycleCanvas = CycleCanvas;
var CanvasItem = /** @class */ (function () {
    function CanvasItem(cell) {
    }
    return CanvasItem;
}());
