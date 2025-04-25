"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const appointmentsRoutes_1 = __importDefault(require("./appointmentsRoutes"));
const router = (0, express_1.Router)();
router.use("/users", usersRoutes_1.default);
router.use("/appointments", appointmentsRoutes_1.default);
exports.default = router;
