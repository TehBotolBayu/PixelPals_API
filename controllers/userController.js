const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    createUser: async (req, res) => {
        try {

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
                    user: {
                        connect: {id: user.id}
                    }
                }
            });
        
            return res.status(200).json({
                status: "created",
                user,
                profile
            })
            
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error
            })
        }
    },

    getUserById: async (req, res) => {
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
    
            return res.status(200).json({
                userData,
                profileData
            })
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
            const updatedProfile = await prisma.users.update({
                data: {
                    username: req.body.username,
                    bio: req.body.bio,
                    picture:  `/images/${req.file.filename}`,
                    user: {
                        connect: {id: user.id}
                    }
                },
                where: {
                    id: req.params.profileId
                }
            })

            return res.status(200).json({
                status: "updated",
                updatedProfile
            });

        } catch (error) {
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

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await prisma.users.delete({
                where: {
                    id: parseInt(req.params.userId)
                }
            })
            
            return res.status(200).json({
                status: "deleted",
                deletedUser
            })
        } catch (error) {
            return res.status(400).json({
                error
            })          
        }
    }
}
