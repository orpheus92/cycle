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
var services_1 = require("@jupyterlab/services");
var widgets_1 = require("@phosphor/widgets");
require("../style/index.css");
var d3 = require("d3");
var JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';
var CycleCanvas = /** @class */ (function (_super) {
    __extends(CycleCanvas, _super);
    function CycleCanvas() {
        var _this = _super.call(this) || this;
        _this.settings = services_1.ServerConnection.makeSettings();
        console.log('new CycleCanvas');
        _this.id = 'cyclus-canvas';
        _this.title.label = 'canvas';
        ;
        _this.title.closable = true;
        _this.addClass('cyclus-canvas');
        // See if we can put image in the middle
        _this.img = document.createElement('img');
        _this.img.className = 'jp-xkcdCartoon';
        _this.node.appendChild(_this.img);
        _this.img.insertAdjacentHTML('afterend', "<div class=\"jp-xkcdAttribution\">\n        <a href=\"https://creativecommons.org/licenses/by-nc/2.5/\" class=\"jp-xkcdAttribution\" target=\"_blank\">\n          <img src=\"https://licensebuttons.net/l/by-nc/2.5/80x15.png\" />\n        </a>\n      </div>");
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
        console.log('items:', items); //print dragged item
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.cell_type == 'code') {
                console.log('code:', item); //print dragged code
            }
        }
        //let widgets = event.mimeData.getData('internal:cells');
    };
    /**
     * Handle update requests for the widget.
     */
    CycleCanvas.prototype.onUpdateRequest = function (msg) {
        var _this = this;
        services_1.ServerConnection.makeRequest({ url: 'https://egszlpbmle.execute-api.us-east-1.amazonaws.com/prod' }, this.settings).then(function (response) {
            _this.img.src = response.data.img;
            _this.img.alt = response.data.title;
            _this.img.title = response.data.alt;
        });
    };
    return CycleCanvas;
}(widgets_1.Widget));
exports.CycleCanvas = CycleCanvas;
var CanvasItem = /** @class */ (function () {
    function CanvasItem(cell) {
    }
    return CanvasItem;
}());
