function defineComputed(target, key, userDef) {
    var shouldCache = !isServerRendering();
    if (isFunction(userDef)) {
        /** computed 两种定义方式
           * computed: {
           *    num(){
           *        return 1
           *    }
           * }
        */
        sharedPropertyDefinition.get = shouldCache
            ? createComputedGetter(key)
            : createGetterInvoker(userDef);
        sharedPropertyDefinition.set = noop;
    }
    else {
        /** 
           * computed: {
           *    num :{
           *        get(){
           *            return 1
           *        },
           *        set(){
           *        }
           *    }
           * }
        */
        // 获取get
        sharedPropertyDefinition.get = userDef.get
            ? shouldCache && userDef.cache !== false
                ? createComputedGetter(key)
                : createGetterInvoker(userDef.get)
            : noop;
        // 获取set
        sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
        sharedPropertyDefinition.set = function () {
            warn$2("Computed property \"".concat(key, "\" was assigned to but it has no setter."), this);
        };
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
function initComputed$1(vm, computed) {
    // $flow-disable-line
    var watchers = (vm._computedWatchers = Object.create(null));
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();
    for (var key in computed) {
        var userDef = computed[key];
        /** computed 两种定义方式
           * computed: {
           *    num :{
           *        get(){
           *            return 1
           *        }
           *    }
           * }
           * computed: {
           *    num(){
           *        return 1
           *    }
           * }
        */
        var getter = isFunction(userDef) ? userDef : userDef.get;
        if (getter == null) {
            warn$2("Getter is missing for computed property \"".concat(key, "\"."), vm);
        }
        if (!isSSR) {
            // create internal watcher for the computed property.
            watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
        }
        // component-defined computed properties are already defined on the
        // component prototype. We only need to define computed properties defined
        // at instantiation here.
        // key没有在vm上，也就是没有props、methods、data同名的key
        if (!(key in vm)) {
            defineComputed(vm, key, userDef);
        }
        else {
            if (key in vm.$data) {
                warn$2("The computed property \"".concat(key, "\" is already defined in data."), vm);
            }
            else if (vm.$options.props && key in vm.$options.props) {
                warn$2("The computed property \"".concat(key, "\" is already defined as a prop."), vm);
            }
            else if (vm.$options.methods && key in vm.$options.methods) {
                warn$2("The computed property \"".concat(key, "\" is already defined as a method."), vm);
            }
        }
    }
}