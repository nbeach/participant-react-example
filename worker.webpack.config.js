const path = require('path');
const glob = require('glob');

const baseConfig = {
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },

}

const workers = glob.sync('./src/participant/**/*.worker.ts')
    .map(path => ({ path, name: path.match(/.\/([A-z]*?).worker.ts/)[1] }))
    .reduce((acc, next) => ({...acc, [next.name]: next.path}), {})

module.exports = [
    {
        ...baseConfig,
        entry: workers
    },
];
