// > Checks to see if a person has 'barbter_cookie' in their req.cookies
const jwt = require('jsonwebtoken')

function auth(req, res, next){
    try{
        // * A user should have a cookie in their req
        const token = req.cookies.barbter_cookie
        
        // * A user doesn't have a cookie in their browser
        if(!token) {
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            })
        }

        // * Checks to see if the TOKEN was made by the server using the secret key
        const validatedUser = jwt.verify(
            token, 
            process.env.JWT_SECRET
        )
        
        // * We get the user ID that's also in MongoDB
        // ? From /register, token has an id parameter
        req.user = validatedUser.id
        
        next()
    }catch(err){
        return res.status(401).json({
            errorMessage: 'Unauthorized'
        })
    }
}

module.exports = auth