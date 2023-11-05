const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createTag: async (req, res) => {
        try {
            const content = await prisma.contents.findUnique({
                where: {
                    id: parseInt(req.body.contentId)
                }
            })

            if(res.locals.userId != content.user_id){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }

            const tag = await prisma.content_tags.create({
                data: {
                    content: {
                        connect: {id: parseInt(req.body.contentId)}
                    },
                    tag: {
                        connect: {id: parseInt(req.body.tagId)}
                    }
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

    getAllTagsByContent: async (req, res) => {
        try {
            const tagList = await prisma.content_tags.findMany({
                where: {
                    content_id: parseInt(req.params.contentId)
                }
            })
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

    deleteTag: async (req, res) => {
        try {
            const content = await prisma.contents.findUnique({
                where: {
                    id: parseInt(req.body.contentId)
                }
            })

            if(res.locals.userId != content.user_id){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }
            
            const deletedTag = await prisma.content_tags.delete({
                where: {
                    content_id_tag_id:{
                        content_id: parseInt(req.body.contentId),
                        tag_id: parseInt(req.body.tagId)
                    }
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