const { loginUser, registerUser, getUser } = require('../services/usersService');


const login = async (req, res) => {
    try{
        const { login, password } = req.body;
        if(!login || !password)
            res.status(400).json({ error: 'Login or password is missing.' })
        const loginData = await loginUser(login, password);
        res.status(200).json(loginData)
    }
    catch (e){
        res.status(500).json({ error: e.message })
    }
}

const register = async (req, res) => {
    try{
        let { login, email, password, passwordCheck } = req.body;

        //Validate required
        if (!login || !email || !password || !passwordCheck)
            return res.status(400).json({ status: false, error: 'Nie wszystkie pola zostały wprowadzone.' });
        if (password.length < 5)
            return res.status(400).json({ status: false, error: 'Długość hasła musi wynosić co najmniej 5 znaków.' });
        if (password !== passwordCheck)
            return res.status(400).json({ status: false, error: 'Wprowadź dwukrotnie to samo hasło w celu weryfikacji.' });

        const registeredUser = await registerUser(login, password, email);
        if(registeredUser.error)
            res.status(400).json(registeredUser.error);
        res.status(200).json();
    }
    catch (e){
        res.status(500).json({ status: false, error: e.message })
    }
}

const userInfo = async (req, res) => {
    try{
        const user = await getUser(req.userID) ;
        res.status(200).json({
            user: {
                id: user._id,
                login: user.login,
                email: user.email
            }
        });
    }
    catch(e){
        res.status(500).json({ error: e.message })
    }
}

module.exports = { login, register, userInfo };