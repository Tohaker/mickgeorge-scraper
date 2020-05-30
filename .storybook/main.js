const { webpack } = require('../craco.config');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  webpackFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: webpack.alias
      }
    };
  }
};