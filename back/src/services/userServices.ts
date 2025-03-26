import { AppDataSource, UserModel } from "../config/data.source";
import { UserDTO, UserLoginDTO, UserLoginSuccessDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { User } from "../entities/User.entity";
import { checkCredentialsServices, createCredentialsServices } from "./credencialServices";
import { Credential } from "../entities/Credential.entity";






export const getUsersService = async (): Promise<UserDTO[]> => {
   const users: User[] = await UserModel.find()
   return users;
};


export const getUserByIdService = async (id: string): Promise<UserDTO> => {
    const userFound = await UserModel.findOne({
        where: {id: parseInt(id, 10)}, relations: ["appointments"]
    })

    if (!userFound) throw new Error(`El usuario ${id} no existe`)
        else return userFound;
};

export const registerUsersService = async (user: UserRegisterDTO): Promise<User> => {

    const result = await AppDataSource.transaction(async(entityManager) => {
        const userCredentials: Credential = await createCredentialsServices(entityManager, user.username, user.password)

        console.log(userCredentials)
        const newUser: User = entityManager.create(User, {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            credential: userCredentials,
        })
        return await entityManager.save(newUser)
    })

    return result;

    
};


export const loginUsersServices = async (user: UserLoginDTO): Promise<UserLoginSuccessDTO> => {

   const credentialId: User | null = await checkCredentialsServices(user.username, user.password)
   console.log(credentialId)
   if(!credentialId) throw new Error("Usuario inexistente")
   const userFound: User | null = await UserModel.findOneBy({id: credentialId.id})

   return {
    login: true,
    user: {
        id: userFound?.id ?? 0,
        name: userFound?.name ?? "",
        email: userFound?.email ?? "",
        birthdate: userFound?.birthdate ?? new Date(),
        nDni: userFound?.nDni ?? 0
    }
   }
}



