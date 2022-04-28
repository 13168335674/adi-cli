export function ServeLogPlugin() {
  return {
    name: "rollup-serve-log-plugin",
    writeBundle() {
      console.log(
        `✨(${process.env.NODE_ENV.toUpperCase()}): 🚀 Completed.`,
      );
    },
  };
}
