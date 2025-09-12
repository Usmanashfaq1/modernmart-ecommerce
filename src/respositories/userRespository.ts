// data base utilities functions
// prisma client
import { Role } from "@/generated/prisma";
import {prisma} from "../lib/prisma";




// fetch user single unique user by id
const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

// usage:



// get all users

const allusers= await prisma.user.findMany();


//create a user
export const createUser = async (data: {id:string, email: string, name:string, role:Role }) => {
  return await prisma.user.create({ data });
};

//delete user 
const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

// Read - by Email
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};



//update user
const updateUser = async (id: string, newData: { name?: string; email?: string; role?: Role }) => {
  return await prisma.user.update({
    where: { id },
    data: newData,
  });
};


export const getUsersByRole = async (role: Role) => {
  return await prisma.user.findMany({ where: { role } });
};

export const userExists = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } }) !== null;
};

export const countUsers = async () => {
  return await prisma.user.count();
};

//paginate users
export const getUsersPaginated = async (skip: number, take: number) => {
  return await prisma.user.findMany({ skip, take });
};



export {allusers,getUserById};




