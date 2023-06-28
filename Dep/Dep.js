 /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   * @internal
   * 一个响应式的属性就会创造一个Dep对象
   */
 var Dep = /** @class */ (function () {
    function Dep() {
        // pending subs cleanup
        this._pending = false;
        // dep的id 唯一标识
        this.id = uid$2++;
        // 储存watcher的数组
        this.subs = [];
    }
    // deps增加watcher
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    // deps删除watcher
    Dep.prototype.removeSub = function (sub) {
        // #12696 deps with massive amount of subscribers are extremely slow to
        // clean up in Chromium
        // to workaround this, we unset the sub for now, and clear them on
        // next scheduler flush.
        this.subs[this.subs.indexOf(sub)] = null;
        if (!this._pending) {
            this._pending = true;
            pendingCleanupDeps.push(this);
        }
    };
    Dep.prototype.depend = function (info) {
        // 执行watcher的addDep函数，addDep函数中再调用dep.addSub将自身watcher添加到deps中
        if (Dep.target) {
            Dep.target.addDep(this);
            if (info && Dep.target.onTrack) {
                Dep.target.onTrack(__assign({ effect: Dep.target }, info));
            }
        }
    };
    // 当dep对应的依赖发生变化时，就会执行该方法，执行使用该依赖所有的组件的watcher的更新函数
    Dep.prototype.notify = function (info) {
        // stabilize the subscriber list first
        var subs = this.subs.filter(function (s) { return s; });
        if (!config.async) {
            // subs aren't sorted in scheduler if not running async
            // we need to sort them now to make sure they fire in correct
            // order
            // watcher有唯一标识id
            // 根据id将subs列表排序
            subs.sort(function (a, b) { return a.id - b.id; });
        }
        // 遍历subs,执行每个wathcer的更新update函数
        for (var i = 0, l = subs.length; i < l; i++) {
            var sub = subs[i];
            if (info) {
                sub.onTrigger &&
                    sub.onTrigger(__assign({ effect: subs[i] }, info));
            }
            sub.update();
        }
    };
    return Dep;
    
}());