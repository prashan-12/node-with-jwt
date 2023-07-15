const userModel = require('./../../models/user.model');
const authentication = require('./../../utils/authentication');

exports.signin = async (req, res) => {
    try{
        const {emailId, password} = req.body;
        let user = await userModel.find({emailId: emailId}).select('-createdAt -updatedAt -__v').lean();
        if(user.length == 0) {
            res.json({massage: "Invalid Credentials and info!", data: 0 });
        }else {
            if(password == user[0].password) {
                let token = authentication.generateToken({
                    id: user[0]._id, 
                    name: user[0].name
                });
                user[0].token = token;
                delete user[0]._id;
                delete user[0].password;
                res.json({massage: "User LoggedIn successfull!", data: user[0] });
            }else {
                res.json({massage: "Invalid data!", data: 0})
            }
        }
    }catch (err) {
        res.json({massage: "There is something goes wrong!", data: 0 });
    }
}

exports.signup = async (req, res) => {
    try{
        const { name, emailId, password } = req.body;
        let user = await userModel.find({emailId: emailId});
        if(user.length != 0) {
            res.json({massage: "User already existed!",  data: 0 });
        }else {
            let userInfo = await userModel.create({name, emailId, password});
            res.json({massage: "User created successfully!", data: userInfo });
        }
    }catch (err) {
        res.status(500).json({massage: "Something goes wrong check it Please!", data: 0 });
    }
}

