module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./src/**/*.ts",
        "./src/**/*.tsx",
    ],
    theme: {
        extend: {
            gridTemplateRows: {
                12: "repeat(12, minmax(0, 1fr));",
            },
            gridTemplateColumns: {
                12: "repeat(12, minmax(0, 1fr));",
            },
            gridRow: {
                "span-7": "span 7 / span 7",
                "span-8": "span 8 / span 8",
                "span-9": "span 9 / span 9",
                "span-10": "span 10 / span 10",
                "span-11": "span 11 / span 11",
                "span-12": "span 12 / span 12",
            },
            gridColumn: {
                "span-7": "span 7 / span 7",
                "span-8": "span 8 / span 8",
                "span-9": "span 9 / span 9",
                "span-10": "span 10 / span 10",
                "span-11": "span 11 / span 11",
                "span-12": "span 12 / span 12",
            },
            backgroundColor: {
                main: "#016fb9",
                dark: "#1d201f",
                light: "#F18F01",
                soft: "#22aed1",
            },
            textColor: {
                main: "#016fb9",
                dark: "#1d201f",
                light: "#F18F01",
                soft: "#22aed1",
            },
        },
    },
    variants: {},
    plugins: [],
};
