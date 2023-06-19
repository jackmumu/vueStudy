function Vue(){}
function eventsMixin(Vue) {
    // 原型上挂载
    Vue.prototype.$once = function (event, fn) {
        // vue实例对象
        var vm = this;
        // 函数包含两部分 调用$off 卸载event对应的函数
        // 执行一次卸载
        function on() {
             // 在vm._events[event]的值数组 删除掉函数fn
            vm.$off(event, on);
            // 执行函数
            fn.apply(vm, arguments);
        }
        // 将函数保存到on函数上
        on.fn = fn;
        // 监听到$emit(event)，触发on函数
        vm.$on(event, on);
        return vm;
    };
}
