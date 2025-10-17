const config = {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}', // ✅ Adicione aqui também
      ],
    },
  },
};

export default config;