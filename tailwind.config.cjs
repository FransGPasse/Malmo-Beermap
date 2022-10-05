module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1f2937",

          secondary: "#e5e7eb",

          accent: "#fbbf24",

          neutral: "#171618",

          "base-100": "#09090B",

          info: "#66C7FF",

          success: "#87D039",

          warning: "#E3D664",

          error: "#FF7070",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
