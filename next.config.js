const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

module.exports = withCSS(withSass({
    webpack: (config, {isServer}) => {
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }
        return config
    },
    env: {
        APP_URL: process.env.APP_URL,
    },
}))
