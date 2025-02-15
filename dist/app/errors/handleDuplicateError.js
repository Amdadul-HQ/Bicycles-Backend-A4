"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractMessate = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractMessate} Is Already exists!!`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};
exports.default = handleDuplicateError;
