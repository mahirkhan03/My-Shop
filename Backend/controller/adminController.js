const adminModel = require('../model/adminModel')

const adminController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.send({ msg: "All Field are required", flag: 0 })
            }
            const admin = await adminModel.findOne({ email: email });
            if (admin) {
                if (admin.password === password) {
                    res.send({ msg: "Login Successfully", flag: 1, admin: { ...admin.toJSON(), password: null } })
                } else {
                    res.send({ msg: "Password do'es not match", flag: 0 })
                }
            }
        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },

}

module.exports = adminController;