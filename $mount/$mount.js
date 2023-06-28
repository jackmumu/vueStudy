// 将vm实例挂载到dom
Vue.prototype.$mount = function (el, hydrating) {
    // el = dom元素
    el = el && query(el);
    /* istanbul ignore if */
    // 不允许挂载到body和html上
    if (el === document.body || el === document.documentElement) {
        warn$2("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
        return this;
    }
    // 获取options
    var options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
        // 选项式存在template
        var template = options.template;
        if (template) {
            // template 为普通字符串
            // const options = {
            //     template: "<div id='app'></div>"
            // }
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template);
                    /* istanbul ignore if */
                    if (!template) {
                        warn$2("Template element not found or is empty: ".concat(options.template), this);
                    }
                }
            }
            else if (template.nodeType) {
                template = template.innerHTML;
            }
            else {
                {
                    warn$2('invalid template option:' + template, this);
                }
                return this;
            }
        }
        else if (el) {
            // @ts-expect-error
            template = getOuterHTML(el);
        }
        if (template) {
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark('compile');
            }
            // 将模板编译成渲染函数
            var _a = compileToFunctions(template, { 
                outputSourceRange: true,
                shouldDecodeNewlines: shouldDecodeNewlines,
                shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                delimiters: options.delimiters,
                comments: options.comments
            }, this), render = _a.render, staticRenderFns = _a.staticRenderFns;
            options.render = render;
            options.staticRenderFns = staticRenderFns; 
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark('compile end');
                measure("vue ".concat(this._name, " compile"), 'compile', 'compile end');
            }
        }
    }
    //挂载
    return mount.call(this, el, hydrating);
};