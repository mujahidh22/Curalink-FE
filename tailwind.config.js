/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#112031",
        mist: "#eef6f7",
        tide: "#0f766e",
        sand: "#f4b860",
        ember: "#bb5c3f"
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"]
      },
      boxShadow: {
        panel: "0 20px 60px rgba(17, 32, 49, 0.12)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
}

