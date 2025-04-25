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
exports.checkCredentialsServices = exports.createCredentialsServices = void 0;
const Credential_entity_1 = require("../entities/Credential.entity");
const data_source_1 = require("../config/data.source");
const crypPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const esconder = new TextEncoder();
    const data = esconder.encode(password);
    const hash = yield crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const passwordCrypt = hashArray.map((value) => value.toString(16).padStart(2, "0")).join("");
    return passwordCrypt;
});
const createCredentialsServices = (entityManager, username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordEncripted = yield crypPass(password);
    const credentials = entityManager.create(Credential_entity_1.Credential, {
        username,
        password: passwordEncripted,
    });
    return yield entityManager.save(credentials);
});
exports.createCredentialsServices = createCredentialsServices;
const checkCredentialsServices = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialFound = yield data_source_1.CredentialModel.findOne({
        where: {
            username: username
        }
    });
    console.log(credentialFound);
    if (!credentialFound)
        throw new Error(`El usuario ${username} no existe`);
    const crypPassword = yield crypPass(password);
    if (credentialFound.password !== crypPassword)
        throw new Error(`Usuario o contraseña incorrectos`);
    const usernameFound = yield data_source_1.UserModel.findOneBy({ credential: { id: credentialFound.id } });
    console.log(usernameFound);
    if (!usernameFound)
        throw new Error("No se encontro el usuario");
    return usernameFound;
});
exports.checkCredentialsServices = checkCredentialsServices;
