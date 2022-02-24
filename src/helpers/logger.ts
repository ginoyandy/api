import logger from 'pino';

export const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
});
