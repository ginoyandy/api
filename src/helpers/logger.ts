import logger from 'pino';

export const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `, "time": "${Date.now()}"`,
});
