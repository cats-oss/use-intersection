module.exports = {
  launch: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  server: {
    command: 'yarn example:ssr',
    port: 3000,
    launchTimeout: 30000,
  },
};
