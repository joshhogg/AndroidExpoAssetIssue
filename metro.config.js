const { getDefaultConfig } = require('metro-config');
const path = require('path');

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts },
    } = await getDefaultConfig();

    return {
        resolver: {
            assetExts: [...assetExts, 'csv'],
            sourceExts: [...sourceExts],
            extraNodeModules: new Proxy({}, {
                get: (target, name) => path.join(process.cwd(), `node_modules/${name}`)
            }),
        },
    }
})();
