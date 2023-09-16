export default {
  buildOptions: {
    out: "dist",
    watch: true,
  },
  mount: {
    src: "/",
  },
  plugins: ["@snowpack/plugin-react-refresh"],
};
