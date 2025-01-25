/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        flexoki: {
          black: "#100F0F",
          paper: "#FFFCF0",
          base: {
            50: "#F2F0E5",
            100: "#E6E4D9",
            150: "#DAD8CE",
            200: "#CECDC3",
            300: "#B7B5AC",
            400: "#9F9D96",
            500: "#878580",
            600: "#6F6E69",
            700: "#575653",
            800: "#403E3C",
            850: "#343331",
            900: "#282726",
            950: "#1C1B1A",
          },
          light: {
            bg: "#FFFCF0", // paper
            "bg-2": "#F2F0E5", // base-50
            ui: "#E6E4D9", // base-100
            "ui-2": "#DAD8CE", // base-150
            "ui-3": "#CECDC3", // base-200
            tx: "#100F0F", // black
            "tx-2": "#6F6E69", // base-600
            "tx-3": "#B7B5AC", // base-300
            re: "#AF3029", // red-600
            or: "#BC5215", // orange-600
            ye: "#AD8301", // yellow-600
            gr: "#66800B", // green-600
            cy: "#24837B", // cyan-600
            bl: "#205EA6", // blue-600
            pu: "#5E409D", // purple-600
            ma: "#A02F6F", // magenta-600
            "re-2": "#D14D41", // red-400
            "or-2": "#DA702C", // orange-400
            "ye-2": "#D0A215", // yellow-400
            "gr-2": "#879A39", // green-400
            "cy-2": "#3AA99F", // cyan-400
            "bl-2": "#4385BE", // blue-400
            "pu-2": "#8B7EC8", // purple-400
            "ma-2": "#CE5D97", // magenta-400
          },
          dark: {
            bg: "#100F0F", // black
            "bg-2": "#1C1B1A", // base-950
            ui: "#282726", // base-900
            "ui-2": "#343331", // base-850
            "ui-3": "#403E3C", // base-800
            "tx-3": "#575653", // base-700
            "tx-2": "#878580", // base-500
            tx: "#CECDC3", // base-200
            re: "#D14D41", // red-400
            or: "#DA702C", // orange-400
            ye: "#D0A215", // yellow-400
            gr: "#879A39", // green-400
            cy: "#3AA99F", // cyan-400
            bl: "#4385BE", // blue-400
            pu: "#8B7EC8", // purple-400
            ma: "#CE5D97", // magenta-400
            "re-2": "#AF3029", // red-600
            "or-2": "#BC5215", // orange-600
            "ye-2": "#AD8301", // yellow-600
            "gr-2": "#66800B", // green-600
            "cy-2": "#24837B", // cyan-600
            "bl-2": "#205EA6", // blue-600
            "pu-2": "#5E409D", // purple-600
            "ma-2": "#A02F6F", // magenta-600
          },
          semantic: {
            // UI & Layout
            "background-main": "#100F0F", // bg - main background
            "background-alt": "#1C1B1A", // bg-2 - secondary background
            "border-base": "#282726", // ui - borders
            "border-hover": "#343331", // ui-2 - hovered borders
            "border-active": "#403E3C", // ui-3 - active borders

            // Typography
            "text-faint": "#575653", // tx-3 - comments, faint text
            "text-muted": "#878580", // tx-2 - punctuation, operators
            "text-primary": "#CECDC3", // tx - primary text

            // Status & Feedback
            "text-error": "#D14D41", // re - errors, invalid code
            "text-warning": "#DA702C", // or - functions, warnings
            "text-success": "#879A39", // gr - keywords, success states

            // Interactive Elements
            "text-link": "#3AA99F", // cy - links, strings

            // Syntax Highlighting
            "syntax-constant": "#D0A215", // ye - constants
            "syntax-variable": "#4385BE", // bl - variables, attributes
            "syntax-number": "#8B7EC8", // pu - numbers
            "syntax-keyword": "#CE5D97", // ma - language features
          },
          red: {
            50: "#FFE1D5",
            100: "#FFCABB",
            150: "#FDB2A2",
            200: "#F89A8A",
            300: "#E8705F",
            400: "#D14D41",
            500: "#C03E35",
            600: "#AF3029",
            700: "#942822",
            800: "#6C201C",
            850: "#551B18",
            900: "#3E1715",
            950: "#261312",
          },
          orange: {
            50: "#FFE1D5",
            100: "#FFCABB",
            150: "#FDB2A2",
            200: "#F89A8A",
            300: "#E8705F",
            400: "#D14D41",
            500: "#C03E35",
            600: "#AF3029",
            700: "#942822",
            800: "#6C201C",
            850: "#551B18",
            900: "#3E1715",
            950: "#261312",
          },
          yellow: {
            50: "#FAEEC6",
            100: "#F6E2A0",
            150: "#F1D67E",
            200: "#ECCB60",
            300: "#DFB431",
            400: "#D0A215",
            500: "#BE9207",
            600: "#AD8301",
            700: "#8E6B01",
            800: "#664D01",
            850: "#503D02",
            900: "#3A2D04",
            950: "#241E08",
          },
          green: {
            50: "#EDEECF",
            100: "#DDE2B2",
            150: "#CDD597",
            200: "#BEC97E",
            300: "#A0AF54",
            400: "#879A39",
            500: "#768D21",
            600: "#66800B",
            700: "#536907",
            800: "#3D4C07",
            850: "#313D07",
            900: "#252D09",
            950: "#1A1E0C",
          },
          cyan: {
            50: "#DDF1E4",
            100: "#BFE8D9",
            150: "#A2DECE",
            200: "#87D3C3",
            300: "#5ABDAC",
            400: "#3AA99F",
            500: "#2F968D",
            600: "#24837B",
            700: "#1C6C66",
            800: "#164F4A",
            850: "#143F3C",
            900: "#122F2C",
            950: "#101F1D",
          },
          blue: {
            50: "#E1ECEB",
            100: "#C6DDE8",
            150: "#ABCFE2",
            200: "#92BFDB",
            300: "#66A0C8",
            400: "#4385BE",
            500: "#3171B2",
            600: "#205EA6",
            700: "#1A4F8C",
            800: "#163B66",
            850: "#133051",
            900: "#12253B",
            950: "#101A24",
          },
          purple: {
            50: "#F0EAEC",
            100: "#E2D9E9",
            150: "#D3CAE6",
            200: "#C4B9E0",
            300: "#A699D0",
            400: "#8B7EC8",
            500: "#735EB5",
            600: "#5E409D",
            700: "#4F3685",
            800: "#3C2A62",
            850: "#31234E",
            900: "#261C39",
            950: "#1A1623",
          },
          magenta: {
            50: "#FEE4E5",
            100: "#FCCFDA",
            150: "#F9B9CF",
            200: "#F4A4C2",
            300: "#E47DA8",
            400: "#CE5D97",
            500: "#B74583",
            600: "#A02F6F",
            700: "#87285E",
            800: "#641F46",
            850: "#4F1B39",
            900: "#39172B",
            950: "#24131D",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
