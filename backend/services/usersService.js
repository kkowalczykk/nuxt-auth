const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (login, password) => {
    try{

        const user = await User.findOne({ login: login });

        if (!user)
            return { error: 'There is no account with this login.' };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return { error: 'Invalid logging data.' };

        //Create token
        let token;
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: 60 * process.env.JWT_TOKEN_EXP});

        return {
            token,
            user: {
                id: user._id,
                login: user.login,
                email: user.email,
            },
        }
    }
    catch(e){
        console.log(e);
        throw new Error('An error occurred while logging in');
    }
}

const registerUser = async (login, password, email) => {
    try{
        const existingUserEmail = await User.findOne({ email: email });
        if (existingUserEmail) {
            return { error: 'Istnieje już konto z podanym adresem email.', status: false };
        }
        const existingUser = await User.findOne({ login: login });
        if (existingUser) {
            return { error: 'Istnieje już konto z podanym loginem', status: false };
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        return await new User({
            login,
            email,
            password: passwordHash
        }).save();


    }
    catch(e){
        console.log(e);
        throw new Error('An error occurred while registering');
    }
}

const getUser = async (id) => {
    try{
        return await User.findById(id);
    }
    catch(e){
        console.log(e);
        throw new Error('An error occurred while getting user data');
    }
}

module.exports = { loginUser, registerUser, getUser }