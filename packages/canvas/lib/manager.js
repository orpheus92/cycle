"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Manager = /** @class */ (function () {
    function Manager(nb, context) {
        var _this = this;
        this._nb = nb;
        this._context = context;
        context.session.kernelChanged.connect(function (sender, kernel) {
            _this.newKernel(kernel);
        });
        if (context.session.kernel) {
            this.newKernel(context.session.kernel);
        }
        console.log('new manager');
    }
    Manager.prototype.newKernel = function (kernel) {
    };
    Object.defineProperty(Manager.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Manager.prototype, "isDisposed", {
        get: function () {
            return this._context === null;
        },
        enumerable: true,
        configurable: true
    });
    Manager.prototype.dispose = function () {
        if (this.isDisposed) {
            return;
        }
        this._nb = null;
        this._context = null;
        console.log('manager disposed');
    };
    return Manager;
}());
exports.Manager = Manager;
