function Vue(){}

function stateMixin(Vue){
    Vue.prototype.$set = set;
}
 /**
  * 
  * @param {Object | Array} target vue data中预先定义的对象
  * @param {string} key 新增的属性
  * @param {*} val 新增的属性值
  * @returns 新增的属性值
  */
 function set(target, key, val) {
    // 参数合法性：target不能为undefined、null、number、string、boolean、symbol类型
    if ((isUndef(target) || isPrimitive(target))) {
        warn$2("Cannot set reactive property on undefined, null, or primitive value: ".concat(target));
    }
    // 不能设置了只读属性
    if (isReadonly(target)) {
        warn$2("Set operation on key \"".concat(key, "\" failed: target is readonly."));
        return;
    }
    // target为vue实例对象上的数组或者对象的响应式数据，会有监听者__ob__
    var ob = target.__ob__;
    // 操作对象为数组：执行数组splice方法，如果该数组已经为响应式，数组原型重新定义了splice方法，已经做了拦截处理执行了响应式部分
    // 不是响应式数据就当普通数组
    if (isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        // when mocking for SSR, array methods are not hijacked
        if (ob && !ob.shallow && ob.mock) {
            observe(val, false, true);
        }
        return val;
    }
    // key已经在对象并且key不是对象，直接赋值返回值
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }
    // target不能为vue实例，应为vue data中预先定义的对象或者数组
    if (target._isVue || (ob && ob.vmCount)) {
        warn$2('Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.');
        return val;
    }
    // 如果对象不是响应式数据，无法做响应式处理，直接赋值返回值
    if (!ob) {
        target[key] = val;
        return val;
    }
    // 正常调用defineReactive方法做对象的响应式
    defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
    {
        ob.dep.notify({
            type: "add" /* TriggerOpTypes.ADD */,
            target: target,
            key: key,
            newValue: val,
            oldValue: undefined
        });
    }
    return val;
}
