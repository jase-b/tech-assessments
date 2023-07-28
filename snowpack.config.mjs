export default {
  mount: {
    src: "/",
  },
  buildOptions: {
    metaUrlPath: "snowpack", // '_' in default name '_snowpack' causes error when loading an extension directory.
    out: "dist",
    watch: true,
  },
  optimize: {
    bundle: true,
    minify: true,
    target: "es2020",
  },
};
