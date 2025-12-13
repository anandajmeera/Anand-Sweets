/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#ff3366', // Pinkish red for sweets
                secondary: '#ffcc00', // Gold/Yellow
            }
        },
    },
    plugins: [],
}
