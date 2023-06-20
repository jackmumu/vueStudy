function Vue(){}

function nextTick(cb, ctx) {
    var _resolve;
    // callbacks 待主线程执行完毕后，执行微任务nextTick中callbacks队列
    callbacks.push(function () {
        if (cb) {
            try {
                // 改变this指向
                cb.call(ctx);
            }
            catch (e) {
                handleError(e, ctx, 'nextTick');
            }
        }
        // $nextTick() 没有参数,则创建微任务，返回成功状态promise
        else if (_resolve) {
            _resolve(ctx);
        }
    });
    // 没有刷新callbacks队列时，执行
    // callbacks执行完毕后，pending改为false
    if (!pending) {
        pending = true;
        timerFunc();
    }
     
    // $nextTick() 没有参数,则创建微任务，返回成功状态promise
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        });
    }
}

function renderMixin(Vue) {
    // Vue实例上挂载
    Vue.prototype.$nextTick = function(fn){
        return nextTick(fn,this)
    }
}
