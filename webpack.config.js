const path = require("path");
module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            include: [path.resolve(__dirname, "src")],
            exclude: /node_modules/,
        }, ],
    },
    output: {
        publicPath: "public",
        filename: "index.js",
        path: path.resolve(__dirname, "public"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};