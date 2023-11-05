const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createContent: async (req, res) => {
        try {
            const uploadFile = res.locals.data
            
            console.log(res.locals.userId);
            if(res.locals.userId != parseInt(req.body.user_id)){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }
            
            const content = await prisma.contents.create({
                data: {
                    title: req.body.title,
                    caption: req.body.caption,
                    image: uploadFile.url,
                    imageId: uploadFile.fileId,
                    user: {
                        connect: {id: parseInt(req.body.user_id)}
                    }
                }
            });

            return res.status(200).json({
                message: "Data berhasil ditambahkan",
                data: content,
                metaData: uploadFile
            })
            
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error
            })           
        }
    },

    getContents: async (req, res) => {
        try {
            const contentList = await prisma.contents.findMany();

            return res.status(200).json({
                contentList
            })
        } catch (error) {
            return res.status(400).json({
                error
            })           
        }
    },

    getContentById : async (req, res, next) => {
        try {
            const content = await prisma.contents.findUnique({
                where: {
                    id: parseInt(req.params.contentId)
                }
            })

            if(!content){
                return res.status(404).json({
                    status: "Data not found"
                })
            }

            res.locals.data = content;

            next();
        } catch (error) {
            return res.status(400).json({
                error
            })       
        }
    },

    updateContent: async (req, res) => {
        try {

            let uploadFile = undefined;
            if(res.locals) uploadFile = res.locals.data;

            const originalContent = await prisma.contents.findUnique({
                where: {
                    id: parseInt(req.params.contentId)
                }
            })

            if(!originalContent) {
                return res.status(404).json({
                    message: "Not Found"
                })
            }

            if(res.locals.userId != parseInt(originalContent.user_id)){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }
            
            const updatedContent = await prisma.contents.update({
                data: {
                    title: req.body.title,
                    caption: req.body.caption,
                    image: (uploadFile)? uploadFile.url : originalContent.image,
                    imageId: (uploadFile)? uploadFile.fileId : originalContent.imageId,
                },
                where: {
                    id: parseInt(req.params.contentId)
                }
            });

            return res.status(200).json({
                message: "Data berhasil diubah",
                data: updatedContent
            })
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error
            })   
        }
    },

    deleteContent: async (req, res, next) => {
        try {
            const content = await prisma.contents.findUnique({
                where: {
                    id: parseInt(req.params.contentId)
                }
            })

            if(!content){
                return res.status(404).json({
                    status: "Data not found"
                })
            }

            if(res.locals.userId != parseInt(content.user_id)){
                return res.status(401).json({
                    status: "unauthorized"
                })
            }

            const deletedContent = await prisma.contents.delete({
                where: {
                    id: parseInt(req.params.contentId)
                }
            });

            res.locals.data = deletedContent;

            next();
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                error
            })      
        }
    }
}