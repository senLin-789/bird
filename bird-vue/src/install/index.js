const modules = import.meta.glob('./**/*', { eager: true })

//安装方法，执行某一类相同操作
function install(app) {
    Object.keys(modules).forEach((key) => {
        const name = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
        const type = key.replace(/^\.\/([\w-]+).*/gi, '$1')
        const module = modules[key]
        if (module.default) {
            switch (type) {
                //用于注册全局指令
                case 'directives':
                    app.directive(name, module.default)
                    break
                //使用插件
                case 'plugins':
                    typeof module.default === 'function' && module.default(app)
                    break
            }
        }
    })
}

export default {
    install
}
