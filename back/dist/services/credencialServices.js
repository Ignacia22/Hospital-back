"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCredentialsServices = exports.createCredentialsServices = void 0;
const Credential_entity_1 = require("../entities/Credential.entity");
const data_source_1 = require("../config/data.source");
const crypPass = async (password) => {
    const esconder = new TextEncoder();
    const data = esconder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const passwordCrypt = hashArray.map((value) => value.toString(16).padStart(2, "0")).join("");
    return passwordCrypt;
};
const createCredentialsServices = async (entityManager, username, password) => {
    const passwordEncripted = await crypPass(password);
    const credentials = entityManager.create(Credential_entity_1.Credential, {
        username,
        password: passwordEncripted,
    });
    return await entityManager.save(credentials);
};
exports.createCredentialsServices = createCredentialsServices;
const checkCredentialsServices = async (username, password) => {
    const credentialFound = await data_source_1.CredentialModel.findOne({
        where: {
            username: username
        }
    });
    console.log(credentialFound);
    if (!credentialFound)
        throw new Error(`El usuario ${username} no existe`);
    const crypPassword = await crypPass(password);
    if (credentialFound.password !== crypPassword)
        throw new Error(`Usuario o contraseña incorrectos`);
    const usernameFound = await data_source_1.UserModel.findOneBy({ credential: { id: credentialFound.id } });
    console.log(usernameFound);
    if (!usernameFound)
        throw new Error("No se encontro el usuario");
    return usernameFound;
};
exports.checkCredentialsServices = checkCredentialsServices;
