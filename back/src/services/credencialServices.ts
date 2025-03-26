import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credential.entity";
import { CredentialModel, UserModel } from "../config/data.source";
import { User } from "../entities/User.entity";


const crypPass = async (password: string): Promise<string> => {

    const esconder = new TextEncoder();
    const data = esconder .encode(password);

    const hash = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hash));

    const passwordCrypt = hashArray.map((value: number) => value.toString(16).padStart(2, "0")).join("");
    return passwordCrypt;
}


export const createCredentialsServices: (entityManager: EntityManager, a: string, b: string) =>Promise<Credential> = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {
    const passwordEncripted = await crypPass(password);

    const existingCredentials = await entityManager.findOne(Credential, {where: {username}});
    if(existingCredentials) throw new Error(`El username "${username}" ya está en uso`)

    const credentials: Credential = entityManager.create(Credential, {
      username,
      password: passwordEncripted,  
    })

    return await entityManager.save(credentials)
    

};


export const checkCredentialsServices = async (username: string, password: string): Promise<User | null>  => {
    
    const credentialFound: Credential | null = await CredentialModel.findOne({
        where: {
            username: username
        }
    })

    console.log(credentialFound)
    if(!credentialFound) throw new Error(`El usuario ${username} no existe`);
    const crypPassword: string = await crypPass(password);
    
    if(credentialFound.password !== crypPassword) throw new Error(`Usuario o contraseña incorrectos`)

    const usernameFound: User | null = await UserModel.findOneBy({credential: {id: credentialFound.id}})
    console.log(usernameFound)
    if(!usernameFound) throw new Error("No se encontro el usuario")
    return usernameFound;
    
};

