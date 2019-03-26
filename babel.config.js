module.exports = function(api) {
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
