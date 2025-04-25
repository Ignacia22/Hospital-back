"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsersServices = exports.registerUsersService = exports.getUserByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data.source");
const User_entity_1 = require("../entities/User.entity");
const credencialServices_1 = require("./credencialServices");
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield data_source_1.UserModel.find();
    return users;
});
exports.getUsersService = getUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield data_source_1.UserModel.findOne({
        where: { id: parseInt(id, 10) }, relations: ["appointments"]
    });
    if (!userFound)
        throw new Error(`El usuario ${id} no existe`);
    else
        return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUsersService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield data_source_1.AppDataSource.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const userCredentials = yield (0, credencialServices_1.createCredentialsServices)(entityManager, user.username, user.password);
        console.log(userCredentials);
        const newUser = entityManager.create(User_entity_1.User, {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            credential: userCredentials,
        });
        return yield entityManager.save(newUser);
    }));
    return result;
});
exports.registerUsersService = registerUsersService;
const loginUsersServices = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const credentialId = yield (0, credencialServices_1.checkCredentialsServices)(user.username, user.password);
    console.log(credentialId);
    if (!credentialId)
        throw new Error("Usuario inexistente");
    const userFound = yield data_source_1.UserModel.findOneBy({ id: credentialId.id });
    return {
        login: true,
        user: {
            id: (_a = userFound === null || userFound === void 0 ? void 0 : userFound.id) !== null && _a !== void 0 ? _a : 0,
            name: (_b = userFound === null || userFound === void 0 ? void 0 : userFound.name) !== null && _b !== void 0 ? _b : "",
            email: (_c = userFound === null || userFound === void 0 ? void 0 : userFound.email) !== null && _c !== void 0 ? _c : "",
            birthdate: (_d = userFound === null || userFound === void 0 ? void 0 : userFound.birthdate) !== null && _d !== void 0 ? _d : new Date(),
            nDni: (_e = userFound === null || userFound === void 0 ? void 0 : userFound.nDni) !== null && _e !== void 0 ? _e : 0
        }
    };
});
exports.loginUsersServices = loginUsersServices;
