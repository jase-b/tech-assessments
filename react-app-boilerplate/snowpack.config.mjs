export default {
  buildOptions: {
    out: "dist",
    watch: true,
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
