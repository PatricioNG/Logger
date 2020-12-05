const prisma = require('../prismaClient');

const createUser = async (hash, email, firstName, lastName) => {
    return await prisma.user_Accounts.create({
        data: {
            hash: hash,
            email: email,
            user: {
                create: {
                    first_name: firstName,
                    last_name: lastName
                }
            }
        }, include: {
            user: {
                select: {
                    id: true
                }
            }
        }
    })
}

const getSingleUserByEmail = async (email) => {
    return await prisma.user_Accounts.findUnique({ where: { email: email, }, })
        .then((user) => user)
        .catch((err) => { throw err });
}

const getSingleUsersData = async (id) => {
    return await prisma.users.findUnique({
        where: { id: id },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            new_user: true
        }
    })
        .then((user) => user)
        .catch((err) => { throw err });
}

module.exports = {
    getSingleUserByEmail,
    createUser,
    getSingleUsersData
}