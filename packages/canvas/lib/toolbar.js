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
var SPACER_CLASS = 'cycle-spacer';
var TOOLBAR_CLASS = 'cycle-toolbar';
var BUTTON_CLASS = 'cycle-button';
var TOGGLE_PRESSED = 'cycle-button-toggle-pressed';
var Spacer = /** @class */ (function (_super) {
    __extends(Spacer, _super);
    function Spacer() {
        var _this = _super.call(this) || this;
        _this.addClass(SPACER_CLASS);
        return _this;
    }
    return Spacer;
}(widgets_1.Widget));
exports.Spacer = Spacer;
function createElement(type, classes) {
    var el = document.createElement(type);
    for (var _i = 0, _a = classes.split(/\s/); _i < _a.length; _i++) {
        var cls = _a[_i];
        el.classList.add(cls);
    }
    return el;
}
var CycleButton = /** @class */ (function (_super) {
    __extends(CycleButton, _super);
    function CycleButton(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, { node: document.createElement('div') }) || this;
        _this.addClass(BUTTON_CLASS);
        var icon = options.icon && options.icon != '' ? options.icon : '';
        if (Array.isArray(icon) == false) {
            _this.node.appendChild(createElement('i', icon));
        }
        else {
            var stack = createElement('span', icon[0]);
            for (var i = 0; i < icon.length; i++) {
                stack.appendChild(createElement('i', icon[i]));
            }
            _this.node.appendChild(stack);
        }
        _this.node.title = options.tooltip || '';
        return _this;
    }
    CycleButton.prototype.on = function (type, cb) {
        if (cb)
            this.node.addEventListener(type, cb);
        return this;
    };
    return CycleButton;
}(widgets_1.Widget));
exports.CycleButton = CycleButton;
var CycleToggleButton = /** @class */ (function (_super) {
    __extends(CycleToggleButton, _super);
    function CycleToggleButton(options) {
        var _this = _super.call(this, options) || this;
        _this._pressed = false;
        _this.on('click', function () { return _this.toggle(); });
        return _this;
    }
    CycleToggleButton.prototype.toggle = function (state) {
        console.log('toggle', this, this._pressed);
        var op = state == 'on' ? true
            : state == 'off' ? false : !this._pressed;
        console.log('op:', op);
        if (op != this._pressed) {
            if (op)
                this.node.classList.add(TOGGLE_PRESSED);
            else
                this.node.classList.remove(TOGGLE_PRESSED);
            this._pressed = op;
        }
        return this;
    };
    return CycleToggleButton;
}(CycleButton));
exports.CycleToggleButton = CycleToggleButton;
var CycleToolbar = /** @class */ (function (_super) {
    __extends(CycleToolbar, _super);
    function CycleToolbar() {
        var _this = _super.call(this) || this;
        _this.addClass(TOOLBAR_CLASS);
        _this.layout = new widgets_1.PanelLayout();
        return _this;
    }
    CycleToolbar.prototype.addItem = function (widget) {
        var layout = this.layout;
        layout.addWidget(widget);
        return this;
    };
    return CycleToolbar;
}(widgets_1.Widget));
exports.CycleToolbar = CycleToolbar;
