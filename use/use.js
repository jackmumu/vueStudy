function initUse(Vue) {
    Vue.use = function (plugin) {
        // 获取储存在实例上已安装的插件数组
        var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
        // 如果该插件已经安装，直接返回vm
        if (installedPlugins.indexOf(plugin) > -1) {
            return this;
        }
        // additional parameters
        // 将vm和use函数的参数组合为一个数组
        var args = toArray(arguments, 1);
        args.unshift(this);
        // plugin = {
        //      install(){}
        // }
        if (isFunction(plugin.install)) {
            plugin.install.apply(plugin, args);
        }
        // plugin = install(){}
        else if (isFunction(plugin)) {
            plugin.apply(null, args);
        }
        // 储存这个install
        installedPlugins.push(plugin);
        return this;
    };
}
function initGlobalAPI(){
    initUse(Vue);
}
initGlobalAPI()