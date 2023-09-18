export default {
  buildOptions: {
    out: "dist",
    watch: false,
  },
  mount: {
    src: "/",
    public: {
      url: "/",
      static: true,
    },
  },
  plugins: ["@snowpack/plugin-react-refresh"],
};
