function initData(vm) {
    // 获取实例化options的data
    var data = vm.$options.data;
    // 组件data(){return {}} getData
    // data{} data
    // 没有就为{}
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
    // 不合法的情况 不是个对象设置为{}
    if (!isPlainObject(data)) {
        data = {};
        warn$2('data functions should return an object:\n' +
                'https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
    }
    // proxy data on instance
    // data和 props或者methods的名字不能重复
    // 判断重复控制台警告
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
        var key = keys[i];
        {
            if (methods && hasOwn(methods, key)) {
                warn$2("Method \"".concat(key, "\" has already been defined as a data property."), vm);
            }
        }
        if (props && hasOwn(props, key)) {
            warn$2("The data property \"".concat(key, "\" is already declared as a prop. ") +
                    "Use prop default value instead.", vm);
        }
        else if (!isReserved(key)) {
            proxy(vm, "_data", key);
        }
    }
    // observe data
    // 做响应式处理
    var ob = observe(data);
    ob && ob.vmCount++;
}