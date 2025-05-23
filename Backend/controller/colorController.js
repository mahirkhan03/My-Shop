const colorModel = require('../model/colorModel')



const colorController = {
    async create(req, res) {
        try {

            const { name, slug, hexcode } = req.body;
            if (!name || !slug || !hexcode) {
                return res.send({ msg: "All Field are required", flag: 0 })
            }

            const color = await colorModel({
                name,
                slug,
                hexcode
            })
            color.save().then(
                () => {
                    return res.send({ msg: "Color Added", flag: 1 })
                }
            ).catch(
                () => {
                    return res.send({ msg: "Unable to add color", flag: 0 })
                }
            )

        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async getdata(req, res) {

        try {
            const id = req.params.id;
            let colors = null;
            if (id) {
                colors = await colorModel.findById(id)

            } else {
                colors = await colorModel.find();
            }
            if (!colors) {
                return res.send({ msg: "No Colors found", flag: 0 });
            }
            res.send({ msg: "Colors fethed successfully", flag: 1, colors })

        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async status(req, res) {
        try {
            const id = req.params.id;
            const colors = await colorModel.findById(id);
            if (!colors) {
                return res.send({ msg: "No Color found", flag: 0 });
            }
            await colorModel.updateOne(
                { _id: id },
                { status: !colors.status }
            ).then(
                () => {
                    return res.send({ msg: 'Color update', flag: 1 })
                }
            ).catch(
                () => {
                    return res.send({ msg: 'Enable to update Colors ', flag: 0 })
                }
            )

        } catch (error) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const colors = await colorModel.findById(id)
            await colorModel.deleteOne(
                {
                    _id: colors._id
                }
            ).then(
                () => {
                    
                    res.send({ msg: "Color delete", flag: 1 })
                }
            ).catch(
                () => {
                    res.send({ msg: "Enable to delete color", flag: 0 })
                }
            )


        } catch (error) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }
    },
      async update(req, res) {
            try {
                const id = req.params.id;
                const colors = await colorModel.findById(id);
                if (!colors) {
                    return res.send({ msg: "No Colors found", flag: 0 });
                }
                else {
                    await colorModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            name: req.body.name,
                            slug: req.body.slug,
                            hexcode:req.body.hexcode
                        }
                    ).then(() => {
                        res.send({ msg: "Color update successfully", flag: 1 })
                    }).catch((err) => {
                        return res.send({ msg: "Enable to update color", flag: 0 })
    
                    })
                }
    
            } catch (error) {
                res.send({ msg: "Internal Server Error", flag: 0 })
            }
    
        }
}


module.exports = colorController;