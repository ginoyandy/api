import logger from 'pino';

export const log = logger({
  base: {
    pid: false,
  },
});
