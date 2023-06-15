
function Vue(){}

function eventsMixin(Vue) {
    Vue.prototype.$emit = function (event) {
        // Vue 实例对象
        var vm = this;
        {
            var lowerCaseEvent = event.toLowerCase();
            if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
                tip("Event \"".concat(lowerCaseEvent, "\" is emitted in component ") +
                    "".concat(formatComponentName(vm), " but the handler is registered for \"").concat(event, "\". ") +
                    "Note that HTML attributes are case-insensitive and you cannot use " +
                    "v-on to listen to camelCase events when using in-DOM templates. " +
                    "You should probably use \"".concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
            }
        }
        // 获取$on 上注册的事件 
        // 例如： this.$on('event', func)  简单等于
        // vm._event['event'] ? vm._event['event'].push(func) : vm._event['event'] = [func]
        // $emit就是触发$on vm._event['event']的数组函数
        var cbs = vm._events[event];
        if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            var args = toArray(arguments, 1);
            var info = "event handler for \"".concat(event, "\"");
            // 多个$on监听同一事件名就会有length > 1的数组
            // $on('event',fn) $on('event',fn2) =》 _event['event'] = [fn,fn2] =》 分别执行fn、fn2
            for (var i = 0, l = cbs.length; i < l; i++) {
                invokeWithErrorHandling(cbs[i], vm, args, vm, info);
            }
        }
        return vm;
    }
}

eventsMixin(Vue)