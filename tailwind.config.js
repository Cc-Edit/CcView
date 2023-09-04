const baseSpacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  30: '7.5rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  58: '14.5rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  86: '21.5rem',
  88: '22rem',
  92: '23rem',
  96: '24rem',
  100: '25rem',
  110: '27.5rem',
  120: '30rem',
  140: '35rem',
  160: '40rem',
  180: '45rem',
  200: '50rem',
};
// 参考： https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.css'
  ],
  corePlugins: {
    // 不使用tailwind的样式重置，使用mui的
    preflight: false
  },
  theme: {
    fontFamily: {
      'base': ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'PingFang SC', 'Microsoft YaHei', '微软雅黑', 'Microsoft JhengHei', '华文细黑', 'STHeiti', 'MingLiu']
    },
    spacing: baseSpacing,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      minHeight: baseSpacing,
      minWidth: baseSpacing,
      maxHeight: baseSpacing,
      maxWidth: baseSpacing,
      cursor: {
        'r-resize': 'row-resize',
        'c-resize': 'col-resize',
        grab: 'grab',
      },
    }
  },
  plugins: []
};
