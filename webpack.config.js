const path = require("path");

const { ImportMapWebpackPlugin } = require("@hackney/webpack-import-map-plugin");
const dotenv = require("dotenv").config();
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const { merge } = require("webpack-merge");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mtfh",
    projectName: "activity-history",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    entry: {
      "activity-history": defaultConfig.entry,
    },
    output: {
      filename: "[name].[contenthash].js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            { loader: "css-loader", options: { sourceMap: false } },
            {
              loader: "sass-loader",
              options: { sourceMap: false },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@services": path.resolve(__dirname, "src/services"),
      },
      extensions: [".ts", ".tsx", ".js"],
    },
    externals: ["react-router-dom", "formik", "yup"],
    plugins: [
      new webpack.EnvironmentPlugin({
        ACTIVITIES_API_URL: dotenv.ACTIVITIES_API_URL || "",
        PERSON_API_URL: dotenv.PERSON_API_URL || "",
        TENURE_API_URL: dotenv.TENURE_API_URL || "",
      }),
      new ImportMapWebpackPlugin({
        namespace: "@mtfh",
        basePath: process.env.APP_CDN || "http://localhost:8020",
      }),
    ],
  });
};
