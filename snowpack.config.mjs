export default {
  mount: {
    src: "/",
  },
  buildOptions: {
    metaUrlPath: "snowpack", // The '_' in the default name of '_snowpack' causes error when loading an extension directory.
    watch: true,
  },
};
