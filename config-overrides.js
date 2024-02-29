const { overrideDevServer } = require('customize-cra');

module.exports = {
    webpack: function (config, env) {
        // 在這裡修改 webpack 設定，如果有需要的話
        return config;
    },
    devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            // 修改 allowedHosts
            config.allowedHosts = ['localhost'];
            return config;
        };
    },
};