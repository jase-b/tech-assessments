export default {
  buildOptions: {
    metaUrlPath: "snowpack", // '_' in default name '_snowpack' causes error when loading an extension directory.
    out: "dist",
    watch: true,
  },
  mount: {
    src: "/",
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    ["@snowpack/plugin-typescript"],
  ],
};
