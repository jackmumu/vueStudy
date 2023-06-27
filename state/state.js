function Vue(options){
    this._init(options)
}
// 状态
// 状态初始化顺序 prop > method > data > computed > watch
function initState(vm) {
    var opts = vm.$options;
    // 处理组件的props
    if (opts.props)
        initProps$1(vm, opts.props);
    // Composition API
    // 组合api
    initSetup(vm);
    // 方法
    if (opts.methods)
        initMethods(vm, opts.methods);
    // data
    if (opts.data) {
        initData(vm);
    }
    else {
        var ob = observe((vm._data = {}));
        ob && ob.vmCount++;
    }
    // 收集属性
    if (opts.computed)
        initComputed$1(vm, opts.computed);
    // 监听
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch);
    }
}

function initMixin$1(Vue) {
    Vue.prototype._init = function () {
        initState(vm);
    };
}
initMixin$1(Vue)