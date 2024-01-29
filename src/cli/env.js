const envPrefix = "RSS_";

const parseEnv = () => {
  const filteredVariables = Object.entries(process.env)
    .filter(([key]) => key.startsWith(envPrefix))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  if (filteredVariables) {
    console.log(`Environment variables with prefix '${envPrefix}':`);
    console.log(filteredVariables);
  } else {
    console.log(`No environment variables with prefix '${envPrefix}' found.`);
  }
};

parseEnv();
