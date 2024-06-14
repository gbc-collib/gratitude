import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        colors: {
            extend: {
                "main-background": "#E8BCB1",
                "card-bg": "#F3D3CF",
                "dark-card": "#d5b6b2",
                "red": "#f4777f",
                "green": "#91b24f",
                "accent": "#B59396",
                "dark-accent": "#573B3E",
                "main-text": "#5D5151",
            }
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
} satisfies Config;
