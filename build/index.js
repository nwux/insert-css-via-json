'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * heavily inspired by [tingle-style](https://github.com/tinglejs/tingle-style/)
 * @author eternalsky
 *
 * Copyright 2014-2015, NWUX Team, Alinw.
 * All rights reserved.
 */

var deepExtend = require('deep-extend');
// let styleToCSS = require('react-style/lib/stylesToCSS');

var styleContext = (function () {
    function styleContext(id) {
        _classCallCheck(this, styleContext);

        var me = this;
        me.id = id;
        me.rule = "";
        me._createStyleEl();
    }

    _createClass(styleContext, [{
        key: '_createStyleEl',
        value: function _createStyleEl() {
            var me = this;
            me.el = document.createElement('style');
            var headEl = document.getElementsByTagName('head')[0];
            me.el.setAttribute('type', 'text/css');
            me.el.setAttribute('id', me.id + '_Style');
            headEl.appendChild(me.el);
        }
    }, {
        key: '_jsonToCss',
        value: function _jsonToCss(rule) {
            var me = this;
            var str = "\n";
            for (var key in rule) {
                if (_typeof(rule[key]) == "object") {
                    str += key + " {";
                    str += me._jsonToCss(rule[key]);
                    str += "}\n";
                } else {
                    str += "  " + key + ": " + rule[key] + ";\n";
                }
            }
            return str;
        }
    }, {
        key: '_insertRule',
        value: function _insertRule() {
            var me = this;
            var el = me.el;
            var rule = me._jsonToCss(me.rule);

            if (el.styleSheet) {
                el.styleSheet.cssText = rule;
            } else {
                el.innerHTML = rule;
            }
        }

        /**
         * 外部接口 添加新的样式规则
         * @param rule {JSON} 
         */

    }, {
        key: 'add',
        value: function add(rule) {
            if ((typeof rule === 'undefined' ? 'undefined' : _typeof(rule)) !== "object") {
                console.error('rule must be an object');
            } else {
                var me = this;
                if (typeof me.rule == "string") {
                    me.rule = rule;
                } else {
                    me.rule = deepExtend(me.rule, rule);
                }
                me._insertRule();
            }
        }
    }]);

    return styleContext;
})();

module.exports = styleContext;