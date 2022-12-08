/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins', 'Ubuntu', 'sans-serif'],
                'poppins-light': ['Poppins Light', 'Ubuntu', 'san-serif', 'serif'],
                'poppins-extra-bold': ['Poppins Extrabold', 'Ubuntu', 'san-serif', 'serif']
            },
            fontSize: {
                'xxs': ['.625rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '2xs': ['.675rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '3xs': ['.825rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '4xs': ['.875rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '5xs': ['.925rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
                '6xs': ['.975rem', {
                    letterSpacing: '-.02em',
                    lineHeight: '1.25rem'
                }],
            }
        },
    },
    plugins: [],
}
