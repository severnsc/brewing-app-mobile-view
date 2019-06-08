import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://localhost:4000"
  },
  staging: {
    apiUrl: "https://brewing-app-api.herokuapp.com"
  },
  prod: {
    apiUrl: "https://brewing-app-api.herokuapp.com"
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
