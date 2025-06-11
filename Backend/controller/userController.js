const { generateToken } = require("../helper");
const UserModel = require("../model/userModel");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);

const userController = {
    async register(req, res) {
        try {
            const { name, email, password, shipping_address } = req.body;

            if (!email || !password || !name) {
                return res.send({ msg: "All field are required", flag: 0 });
            }
            const userExisting = await UserModel.findOne({ email: email });
            if (userExisting) {
                res.send({
                    msg: "try with different email id",
                    flag: 0,

                })
            } else {
                const user = new UserModel({
                    name: name,
                    email: email,
                    password: cryptr.encrypt(password),
                    shipping_address: shipping_address
                })

                await user.save()
                res.send({
                    msg: "User accound create",
                    flag: 1,
                    user: { ...user.toJSON(), password: null },
                    token: generateToken({ ...user.toJSON() })
                })
            }
        } catch (err) {
            res.send({ msg: "Internal server error", flag: 0 })
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.send({ msg: "All fields are required", flag: 0 });
            }
            const user = await UserModel.findOne({ email });
            if (user) {
                if (cryptr.decrypt(user.password) === password) {
                    return res.send({
                        msg: "Login Successfully",
                        flag: 1,
                        user: { ...user.toJSON(), password: null },
                        token: generateToken({ ...user.toJSON() })
                    });
                } else {
                    return res.send({ msg: "Password does not match", flag: 0 });
                }
            } else {
                return res.send({ msg: "User not found", flag: 0 });
            }

        } catch (err) {
            console.error("Login Error:", err);
            return res.send({ msg: "Internal server error", flag: 0 });
        }
    }
    ,

}

module.exports = userController;