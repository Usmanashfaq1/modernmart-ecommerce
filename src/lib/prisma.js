"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
// primsa singleton instance live here
var index_js_1 = require("../generated/prisma/index.js");
var globalForPrisma = global;
exports.prisma = globalForPrisma.prisma ||
    new index_js_1.PrismaClient({
        log: ["query", "error", "warn"],
    });
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = exports.prisma;
