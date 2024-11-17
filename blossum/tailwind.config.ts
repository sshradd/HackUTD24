import type { Config } from 'tailwindcss'
 
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bondiblue: "#2A92B1", // Custom colors based on the image
        eggshell: "#F0EDDB",
        pistachio: "#8CC487",
        wenge: "#655453",
        lightpink: "#FCE4E3",
      },


    },
  },
  plugins: [],
}
export default config