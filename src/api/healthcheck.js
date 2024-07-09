export const healthcheck = () => {
  return {
    version: process.env.npm_package_version,
    envs: process.env
  };
};