/** @type {import('tailwindcss').Config} */

const generateSpacing = (pixelBase, values) => {
    return values.reduce((acc, v) => {
        acc[`${v.toString().replace('.', '_')}`] = `${v * 0.1 * pixelBase}rem`
        return acc
    }, {})
}

const generateFontSizes = (values) => {
    return values.reduce((acc, v) => {
        acc[`${v.toString().replace('.', '_')}`] = `${v * 0.1}rem`
        return acc
    }, {})
}

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        fontFamily: {
            raleway: ['var(--font-raleway)', ...fontFamily.sans],
        },
        spacing: generateSpacing(
            8,
            [
                0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 8, 10, 12, 15, 16,
                18,
            ]
        ),
        fontSize: generateFontSizes([
            10, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64,
            72, 80, 96,
        ]),
        extend: {},
    },
    plugins: [],
}
