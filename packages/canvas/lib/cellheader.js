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
var cells_1 = require("@jupyterlab/cells");
var widgets_1 = require("@phosphor/widgets");
var toolbar_1 = require("./toolbar");
var CELL_HEADER_CLASS = 'cycle-cell-header';
var CELL_FOOTER_CLASS = 'cycle-cell-footer';
var CycleCellHeader = /** @class */ (function (_super) {
    __extends(CycleCellHeader, _super);
    function CycleCellHeader() {
        var _this = _super.call(this) || this;
        _this.addClass(CELL_HEADER_CLASS);
        var layout = _this.layout = new widgets_1.PanelLayout();
        _this._toolbar = new toolbar_1.CycleToolbar();
        layout.addWidget(_this._toolbar);
        return _this;
    }
    Object.defineProperty(CycleCellHeader.prototype, "toolbar", {
        get: function () { return this._toolbar; },
        enumerable: true,
        configurable: true
    });
    return CycleCellHeader;
}(cells_1.CellHeader));
exports.CycleCellHeader = CycleCellHeader;
var CycleCellFooter = /** @class */ (function (_super) {
    __extends(CycleCellFooter, _super);
    function CycleCellFooter() {
        var _this = _super.call(this) || this;
        _this.addClass(CELL_FOOTER_CLASS);
        var layout = _this.layout = new widgets_1.PanelLayout();
        _this._toolbar = new toolbar_1.CycleToolbar();
        layout.addWidget(_this._toolbar);
        return _this;
    }
    Object.defineProperty(CycleCellFooter.prototype, "toolbar", {
        get: function () { return this._toolbar; },
        enumerable: true,
        configurable: true
    });
    return CycleCellFooter;
}(cells_1.CellFooter));
exports.CycleCellFooter = CycleCellFooter;
