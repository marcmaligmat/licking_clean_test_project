import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'soft-teal': '#4DB6AC',
        'warm-coral': '#FF7F50',
        'crisp-white': '#FFFFFF',
        'slate-gray': '#708090',
        'golden-beige': '#F5E050',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      fontSize: {
        'heading': ['20px', { lineHeight: '1.2', fontWeight: 'bold' }],
        'body': ['14px', { lineHeight: '1.5' }],
      },
      maxWidth: {
        'profile': '800px',
      },
    },
  },
  plugins: [],
}

export default config