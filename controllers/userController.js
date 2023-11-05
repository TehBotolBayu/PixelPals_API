const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
}

module.exports = {
    createUser: async (req, res) => {
        try {
            const hashed = await hashPassword(req.body.password);

            const uploadFile = res.locals.data

            const user = await prisma.users.create({
                data: {
                    email: req.body.email,
                    password: hashed
                }
            });
        
            const profile = await prisma.profiles.create({
                data: {
                    username: req.body.username,
                    bio: req.body.bio,
                    picture: uploadFile.url,
                    imageId: uploadFile.fileId,
                    user: {
                        connect: {id: user.id}
                    }
                }
            });
        
            return res.status(200).json({
                status: "created",
                user,
                profile,
                metaData: uploadFile
            })
            
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error
            })
        }
    },

    getUserById: async (req, res, next) => {
        try {            
            const userData = await prisma.users.findUnique({
                where: {
                    id: parseInt(req.params.userId)
                }
            })

            if(!userData){
                return res.status(404).json({
                    status: "Not Found",
                    message: "User is not registered"
                })
            }

            const profileData = await prisma.profiles.findUnique({
                where: {
                    user_id: userData.id 
                }
            })

            if(!profileData){
                return res.status(404).json({
                    status: "Not Found",
                    message: "User is not registered"
                })
            }
        
            res.locals.data = {...userData, ...profileData};
            
            next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error,
            })
        }
    },

    getUsers: async (req, res) => {
        try {
            const userList = await prisma.users.findMany();

            return res.status(200).json({
                userList
            })
        } catch (error) {
            return res.status(400).json({
                error
            })           
        }
    },

    updateProfile: async (req, res) => {
        try {
            console.log(req.body);

            let uploadFile = undefined;
            if(res.locals) uploadFile = res.locals.data;

            const originalProfile = await prisma.profiles.findUnique({
                where: {
                    user_id: parseInt(req.params.userId)
                }
            })

            if(!originalProfile) {
                return res.status(404).json({
                    message: "Not Found"
                })
            }
            
            if(res.locals.userId != parseInt(req.params.userId)){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }   

            const updatedProfile = await prisma.profiles.update({
                data: {
                    username: req.body.username,
                    bio: req.body.bio,
                    picture:  (uploadFile)? uploadFile.url : originalContent.picture,
                    imageId: (uploadFile)? uploadFile.fileId : originalContent.imageId,
                },
                where: {
                    user_id: parseInt(req.params.userId)
                }
            })

            return res.status(200).json({
                status: "Data berhasil diubah",
                data: updatedProfile
            });

        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error
            })                 
        }
    },

    updateUser: async (req, res) => {
        try {
            const findUser = await prisma.users.findUnique({
                where: {
                    email: req.body.email
                }
            });

            if(!findUser){
                return res.status(404).json({
                    status: "Data not found"
                })
            }
            
            if(res.locals.userId != parseInt(findUser.id)){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }            

            if(bcrypt.compareSync(req.body.password, findUser.password)){
                const hashed = await hashPassword(req.body.newpassword);
                
                const updated = await prisma.users.update({
                    data: {
                        email: req.body.newemail,
                        password: hashed
                    },
                    where: {
                        id: findUser.id
                    }
                })
    
                return res.status(200).json({
                    status: "updated",
                    data: updated
                })
            }

            return res.status(401).json({
                status: "wrong password"
            })
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                error
            })
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: parseInt(req.params.userId)
                }
            })

            if(!user){
                return res.status(404).json({
                    status: "Data not found"
                })
            }

            if(res.locals.userId != parseInt(user.id)){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }

            const deletedUser = await prisma.users.delete({
                where: {
                    id: parseInt(req.params.userId)
                }
            })
            
            res.locals.data = deletedUser;

            next();
        } catch (error) {
            return res.status(400).json({
                error
            })          
        }
    }
}