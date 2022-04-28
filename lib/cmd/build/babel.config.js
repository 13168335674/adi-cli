// const devPresets = ['@vue/babel-preset-app'];
const devPresets = [];

const buildPresets = [];

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        include: [
          /(optional-chaining|nullish-coalescing)/
        ],
      },
    ],
    ...(process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  ],
};
