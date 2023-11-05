const {PrismaClient} = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const loginUser = async (req, res) => {
    try {
        const findUser = await prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        })
    
        if(!findUser){
            return res.status(404).json({
                error: 'User not exist'
            });
        }
    
        if(bcrypt.compareSync(req.body.password, findUser.password)){
            const token = jwt.sign(
            {
                id: findUser.id
            },
            'secret_key', 
            {
                expiresIn: '24h'
            })
            return res.status(200).json({
                data: {
                    token
                },
                id: findUser.id
            })
        }
    
        return res.status(403).json({
            error: 'Invalid credentials'
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            error
        })
    }

};

module.exports = loginUser;