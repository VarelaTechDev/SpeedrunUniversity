// > Checks ti see if a person has 'speedrun_cookie' in their req.cookies
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    try{

        console.log('HELLO WORLD')
        // ? A user should have a cookie in their req
        const token = req.cookies.speedrun_cookie
        console.log('Test')
        // ? IF a user doesn't have the cookie, give them this
        if(!token){
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            })
        }
        
        // ? Checks to see if the TOKEN was made by us with our secret key
        const validatedUser = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        
        req.user = validatedUser
        console.log(validatedUser)

        next()
    }
    catch(err){
        return res.status(401).json({
            errorMessage: 'Unauthorized'
        })
    }
}

module.exports = auth