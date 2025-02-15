"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHander_1 = __importDefault(require("./app/middleware/globalErrorHander"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'], credentials: true }));
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api/v1', routes_1.default);
const getAController = (req, res) => {
    res.send('Hello World!');
};
app.get('/', getAController);
app.use(globalErrorHander_1.default);
// Not Found
app.use(notFound_1.default);
exports.default = app;
