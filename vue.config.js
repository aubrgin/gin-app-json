module.exports = {
  configureWebpack: {
    target: 'electron-renderer',
  },
  chainWebpack: (config) => {
    config.entry('main').add('./src/main.js');
  },
};
