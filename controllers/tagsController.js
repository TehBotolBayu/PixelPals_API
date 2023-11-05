const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createTag: async (req, res) => {
        try {
            const tag = await prisma.tags.create({
                data: {
                    name: req.body.name,
                    description: req.body.description
                }
            })
    
            return res.status(200).json({
                status: "success",
                tag
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json(
                error
            )
        }
    },

    getAllTags: async (req, res) => {
        try {
            const tagList = await prisma.tags.findMany();
            return res.status(200).json({
                data: tagList
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json(
                error
            )
        }
    },

    getTag: async (req, res) => {
        try {
            const tag = await prisma.tags.findUnique({
                where: {
                    id: parseInt(req.params.tagId)
                }
            });

            if(!tag){
                return res.status(404).json({
                    status: "Not Found"
                })
            }

            return res.status(200).json({
                data: tag
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json(
                error
            )
        }
    },

    updateTags: async (req, res) => {
        try {
            const tag = await prisma.tags.findUnique({
                where: {
                    id: parseInt(req.params.tagId)
                }
            });

            if(!tag){
                return res.status(404).json({
                    status: "Not Found"
                })
            }

            const updatedTag = await prisma.tags.update({
                data: {
                    name: req.body.name,
                    description: req.body.description
                },
                where: {
                    id: parseInt(req.params.tagId)
                }
            })

            return res.status(200).json({
                status: "updated",
                updatedTag
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json(
                error
            )
        }
    },

    deleteTag: async (req, res) => {
        try {
            const deletedTag = await prisma.tags.delete({
                where: {
                    id: parseInt(req.params.tagId)
                }
            })

            return res.status(200).json({
                status: "deleted",
                deletedTag
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json(
                error
            )
        }
    }   
}