const bcrypt=require('bcrypt')

const hashPassword = async (password)=>{
    try {
        const hashedPass = await bcrypt.hash(password, 10)
        return hashedPass
    } catch (error) {
        console.log(error)
    }
}

const checkPass = async (password, dbPass)=>{
    try {
        return await bcrypt.compare(password, dbPass)
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    hashPassword,
    checkPass
}