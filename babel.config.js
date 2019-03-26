module.exports = function(api) {
  api.cache(true);
  if (api.env("ci")) {
    return {
      presets: ["babel-preset-expo"],
      plugins: ["babel-plugin-proposal-class-properties"]
    };
  } else {
    return {
      presets: ["babel-preset-expo"]
    };
  }
};
