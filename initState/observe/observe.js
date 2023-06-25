function observe(value, shallow, ssrMockReactivity) {
    // __ob__是否已经做响应式的标志
    // value存在__ob__属性，则已经是响应式数据，直接返回
    if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        return value.__ob__;
    }
    if (shouldObserve &&
        (ssrMockReactivity || !isServerRendering()) &&
        (isArray(value) || isPlainObject(value)) &&
        Object.isExtensible(value) &&
        !value.__v_skip /* ReactiveFlags.SKIP */ &&
        !isRef(value) &&
        !(value instanceof VNode)) {
        return new Observer(value, shallow, ssrMockReactivity);
    }
}
// 构造函数Observer
var Observer = /** @class */ (function () {
    function Observer(value, shallow, mock) {
        if (shallow === void 0) { shallow = false; }
        if (mock === void 0) { mock = false; }
        this.value = value;
        this.shallow = shallow;
        this.mock = mock;
        // this.value = value
        this.dep = mock ? mockDep : new Dep();
        this.vmCount = 0;
        // 在这个对象上设置__ob__属性，作为响应式处理标志
        def(value, '__ob__', this);
        // 数组
        if (isArray(value)) {
            if (!mock) {
                if (hasProto) {
                    value.__proto__ = arrayMethods;
                    /* eslint-enable no-proto */
                }
                else {
                    for (var i = 0, l = arrayKeys.length; i < l; i++) {
                        var key = arrayKeys[i];
                        def(value, key, arrayMethods[key]);
                    }
                }
            }
            if (!shallow) {
                this.observeArray(value);
            }
        }
        else {
            /**
             * Walk through all properties and convert them into
             * getter/setters. This method should only be called when
             * value type is Object.
             */
            // 对象{}
            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                // get set 响应式
                defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock);
            }
        }
    }
    /**
     * Observe a list of Array items.
     */
    Observer.prototype.observeArray = function (value) {
        for (var i = 0, l = value.length; i < l; i++) {
            observe(value[i], false, this.mock);
        }
    };
    return Observer;
}());