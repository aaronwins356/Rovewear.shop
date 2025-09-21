const tailwindcss = require('tailwindcss');

module.exports = function tailwindcssPostcssPlugin(options) {
  return tailwindcss(options);
};

module.exports.postcss = true;
