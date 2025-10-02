// babel.config.js

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // THIS PLUGIN MUST BE THE LAST ITEM IN THE ARRAY!
      'react-native-reanimated/plugin',
    ],
  };
};