"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const prisma_1 = require("../../../shared/prisma");
const http_status_1 = __importDefault(require("http-status"));
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const isExist = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.ProfileService = {
    getMyProfile,
};
