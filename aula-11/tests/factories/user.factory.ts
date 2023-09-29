import prisma from "../../src/database";
import { UserInput } from "../../src/repository";

export async function createUser(email: string, password?: string) {
    const userData: UserInput = {
        email,
        password: password || new Date().toString()
    };

    return await prisma.user.create({ data: userData });
}