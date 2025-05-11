const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

// Destructure for easier access
const { transformer, resolver } = config;

// Configure react-native-svg-transformer
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};
config.resolver = {
  ...resolver,
  // Remove 'svg' from assetExts
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  // Add 'svg' to sourceExts
  sourceExts: [...resolver.sourceExts, "svg"],
};

module.exports = withNativeWind(config, { input: './global.css' }); 