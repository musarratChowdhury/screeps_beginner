const path = require("path");

module.exports = {
  entry: "./src/main.ts", // Entry point of your TypeScript code
  output: {
    filename: "main.js", // Output bundle filename
    path: path.resolve(__dirname, ""), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Apply this rule to .ts files
        use: "ts-loader", // Use ts-loader to transpile TypeScript
        exclude: /node_modules/, // Exclude node_modules
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Resolve .ts and .js files
  },
  mode: "development", // Use production mode for optimized output
};
