/*
 * heavily inspired by [tingle-style](https://github.com/tinglejs/tingle-style/)
 * @author eternalsky
 *
 * Copyright 2014-2015, NWUX Team, Alinw.
 * All rights reserved.
 */

let deepExtend = require('deep-extend');

class styleContext {
    constructor(id) {
        let me = this;
        me.id = id;
        me.rule = "";
        me._createStyleEl();
    }


    _createStyleEl() {
        let me = this;
        me.el = document.createElement('style');
        let headEl = document.getElementsByTagName('head')[0];
        me.el.setAttribute('type', 'text/css');
        me.el.setAttribute('id', me.id + '_Style');
        headEl.appendChild(me.el);
    }

    _jsonToCss(rule) {
        let me = this;
        let str = "\n";
        for (let key in rule) {
            if (typeof rule[key] == "object") {
                str += key + " {";
                str += me._jsonToCss(rule[key]);
                str += "}\n";
            }
            else {
                str += "  " + key + ": " + rule[key] + ";\n";
            }
        }
        return str;
    }

    _insertRule() {
        let me = this;
        let el = me.el;
        let rule = me._jsonToCss(me.rule);

        if (el.styleSheet) {
            el.styleSheet.cssText = rule;
        }
        else {
            el.innerHTML = rule;
        }
    }

    /**
     * 外部接口 添加新的样式规则
     * @param rule {JSON} 
     */
    add(rule) {
        if (typeof rule !== "object") {
            console.error('rule must be an object');
        }
        else {
        	let me = this;
            if (typeof me.rule == "string") {
                me.rule = rule;
            }
            else {
                me.rule = deepExtend(me.rule, rule);
            }
            me._insertRule();
        }
    }
}

module.exports = styleContext;