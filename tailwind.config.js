/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores basados en qwenRecepciones
        clr1: '#FFFFFF',
        clr2: '#666666',
        clr3: '#333333',
        clr4: '#000000',
        clr5: '#A1C181',
        clr6: '#e63946',
        clr7: '#FE7F2D',
        // Mantener los colores existentes
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  safelist: [
    // Asegurar que se generen clases para gradientes arbitrarios
    {
      pattern: /^bg-gradient-to-(t|b|l|r|tl|tr|bl|br)$/,
    },
    {
      pattern: /^(from|via|to)-/,
    },
    {
      pattern: /^(bg|text|border)-\[.*\]/,
    },
    {
      pattern: /^(bg|text|border)-\[.*\]\/\d+$/,
    },
    // Clases adicionales que necesitas específicamente
    {
      pattern: /^bg-\[var\(.*\)\]$/,
    },
    {
      pattern: /^text-\[var\(.*\)\]$/,
    },
    {
      pattern: /^border-\[var\(.*\)\]$/,
    },
    {
      pattern: /^bg-\[#[0-9a-fA-F]+\]$/,
    },
    {
      pattern: /^bg-\[#[0-9a-fA-F]+\]\/\d+$/,
    },
    {
      pattern: /^from-\[#[0-9a-fA-F]+\]$/,
    },
    {
      pattern: /^to-\[#[0-9a-fA-F]+\]$/,
    },
    {
      pattern: /^to-\[#[0-9a-fA-F]+\]\/\d+$/,
    },
    {
      pattern: /^text-\[#[0-9a-fA-F]+\]$/,
    },
    {
      pattern: /^border-\[#[0-9a-fA-F]+\]$/,
    },
    // Clases específicas que necesitas
    {
      pattern: /^bg-\[\#1d1d1d\]$/,
    },
    {
      pattern: /^bg-\[\#cb3327\]$/,
    },
    {
      pattern: /^bg-\[\#cb3327\]\/60$/,
    },
    {
      pattern: /^from-\[\#1d1d1d\]$/,
    },
    {
      pattern: /^to-\[\#cb3327\]$/,
    },
    {
      pattern: /^to-\[\#cb3327\]\/60$/,
    },
    {
      pattern: /^text-\[--clr4\]$/,
    },
    {
      pattern: /^text-\[var\(--clr1\)\]$/,
    },
    {
      pattern: /^text-\[var\(--clr2\)\]$/,
    },
    {
      pattern: /^text-\[var\(--clr4\)\]$/,
    },
    {
      pattern: /^border-\[var\(--clr4\)\]$/,
    },
  ],
  plugins: [
    // Plugin para habilitar variantes de opacidad personalizadas
    function({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('parent', '&');
    },
  ],
};