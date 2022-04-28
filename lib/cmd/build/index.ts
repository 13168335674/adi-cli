const loadConfigFile = require("rollup/dist/loadConfigFile.js");
const path = require("path");
const rollup = require("rollup");

export const build = (
  config: { useWatch: Boolean } = {
    useWatch: false,
  },
) => {
  // load the config file next to the current script;
  // the provided config object has the same effect as passing "--format es"
  // on the command line and will override the format of all outputs
  loadConfigFile(
    path.resolve(__dirname, "../lib/cmd/build/", "rollup.config.js"),
    {
      format: "es",
    },
  ).then(({ options, warnings }) => {
    // "warnings" wraps the default `onwarn` handler passed by the CLI.
    // This prints all warnings up to this point:
    // console.log(`We currently have ${warnings.count} warnings`);

    // This prints all deferred warnings
    warnings.flush();

    // options is an "inputOptions" object with an additional "output"
    // property that contains an array of "outputOptions".
    // The following will generate all outputs and write them to disk the same
    // way the CLI does it:
    options.map(options => {
      rollup.rollup(options).then(bundle => {
        Promise.all(options.output.map(bundle.write));
        // You can also pass this directly to "rollup.watch"
        config.useWatch && rollup.watch(options);
      });
    });
  });
};
