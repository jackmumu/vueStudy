// 处理options中的methods
function initMethods(vm, methods) {
    // props的初始化在methods前面，methods和props同名会警告
    var props = vm.$options.props;
    for (var key in methods) {
        {
            // methods中定义的不是函数
            if (typeof methods[key] !== 'function') {
                warn$2("Method \"".concat(key, "\" has type \"").concat(typeof methods[key], "\" in the component definition. ") +
                    "Did you reference the function correctly?", vm);
            }
            // props和methods同名警告
            if (props && hasOwn(props, key)) {
                warn$2("Method \"".concat(key, "\" has already been defined as a prop."), vm);
            }
            // key是保留字
            if (key in vm && isReserved(key)) {
                warn$2("Method \"".concat(key, "\" conflicts with an existing Vue instance method. ") +
                    "Avoid defining component methods that start with _ or $.");
            }
        }
        // 不是函数 就赋值空函数
        // 是函数 改变this指向vm
        vm[key] = typeof methods[key] !== 'function' ? noop : bind$1(methods[key], vm);
    }
}