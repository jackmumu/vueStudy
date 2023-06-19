function Vue(){}

function eventsMixin(Vue) {
    Vue.prototype.$off = function (event, fn) {
        var vm = this;
        // all
        // 如果没有一个参数$off(),就置空vm._events卸载全部事件
        if (!arguments.length) {
            vm._events = Object.create(null);
            return vm;
        }
        // array of events
        // 监听事件如果为一个数组，就遍历为每一项绑定函数
        if (isArray(event)) {
            for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                vm.$off(event[i_1], fn);
            }
            return vm;
        }
        // specific event
        var cbs = vm._events[event];
        // 如果$on(event),没有该事件的处理函数，则不执行
        if (!cbs) {
            return vm;
        }
        // $off(event) 则置空该事件对应的函数列表，清空所有函数
        if (!fn) {
            vm._events[event] = null;
            return vm;
        }
        // specific handler
        var cb;
        var i = cbs.length;
        // 卸载_events[event]的值函数列表中fn
        while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
            }
        }
        return vm;
    };
}
