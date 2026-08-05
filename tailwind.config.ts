import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens estratti dalla brand identity UNDERGROUND EVENTS
        ue: {
          black: "#0A0A0A",   // fondo primario
          ink: "#121212",      // fondo secondario / card
          white: "#F5F5F3",    // logo / testo primario su nero
          smoke: "#9A9A9A",    // testo secondario
          line: "#2A2A2A",     // hairline / bordi
          red: "#E31E24",      // accento — usato con parsimonia (sottolineatura logo)
          redDim: "#7A1013",   // rosso attenuato per glow/hover
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "tunnel-glow":
          "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(227,30,36,0.14), rgba(10,10,10,0) 70%)",
      },
      keyframes: {
        tunnelIn: {
          "0%": { transform: "scale(1.4)", opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(24px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        tunnelIn: "tunnelIn 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
        fadeUp: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
