const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: { noEmit: false },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // Si la taille du fichier est inférieure à 8ko, il sera intégré en base64 dans le bundle
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'manifest.json', to: '../manifest.json' }],
        }),
        ...getHtmlPlugins(['index']),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            'node_modules',
            './src',
            './src/components',
            './src/components/Gauges/gauges',
        ],
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js',
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: 'React extension',
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
