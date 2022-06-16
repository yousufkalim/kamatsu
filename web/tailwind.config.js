module.exports = {
  // mode: 'jit',
  purge: ["./src/**/*.{js, jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        'email' : '#1fb6ff',
        'yellow' : '#FFC82F',
        'gray' : '#A5ABAF',
        'blue' : '#2D2F8A',
        'deepGray' : '#F6F6F6',
        'resultLabel' : '#A1A1A1',
        'red' : '#fff000'
        // 'resultValue' : 
      },
      fontSize : {
        'body' : '18px',
        'headline' : '70px',
        'smaller' : '12px',
        'title' : '28px',
        'about' : '14px',
        'resultLabel' : ['16px', '23px'],

      },
      lineHeight: {
        'headline' : '90px',
        'body' : '36px',
        'smaller' : '23px',
        'title' : '60px',
        'about' : '26px',

      },
      screens:{
        'mobile':'540px',
        'xxl':'1920px',
      },
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
