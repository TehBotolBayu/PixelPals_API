const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUser: async (req, res) => {
        try {
            const uploadFile = res.locals.data

            const user = await prisma.users.create({
                data: {
                    email: req.body.email,
                    password: req.body.password
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

            const originalContent = await prisma.profiles.findUnique({
                where: {
                    user_id: parseInt(req.params.userId)
                }
            })

            if(!originalContent) {
                return res.status(404).json({
                    message: "Not Found"
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
            const updatedUser = await prisma.users.update({
                data: {
                    email: req.body.email,
                    password: req.body.password
                },
                where: {
                    id: req.params.userId
                }
            });
            
            return res.status(200).json({
                status: "updated",
                updatedUser
            });
        } catch (error) {
            return res.status(400).json({
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