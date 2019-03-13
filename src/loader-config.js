function getConfig(env) {
  const loaderConfig = {
    parseOnLoad: false,
    tlmSiblingOfDojo: true,
    has: {
      "foreign-loader": true
      // "mvc-bindings-log-api": true
    },
    isDebug: false,
    async: false,
    blankGif: "./assets/images/blank.gif",
    useDeferredInstrumentation: true,
    production: env.production,
    packages: [
      { name: "app", location: env.dojoRoot + "/app", main: "app" }
    ]
  }

  if (!env.build) {
    loaderConfig.locale = dojoConfig.locale
  }

  return loaderConfig
}

if (typeof module !== "undefined" && module) {
  module.exports = getConfig
} else {
  getConfig({ dojoRoot: "/" })
}
