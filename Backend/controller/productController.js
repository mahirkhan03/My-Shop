const { createuniqueimage } = require("../helper")
const productModel = require("../model/productModel");
const { unlinkSync } = require('fs')
const util = require("util");
const categoryModel = require("../model/categoryModel");
const colorModel = require("../model/colorModel");

const productController = {
    async create(req, res) {
        try {
            const image = req.files.thumbnail;
            if (!req.body.name || !req.body.slug) {
                return res.send({ msg: "All Field are required", flag: 0 })
            }
            const productImage = createuniqueimage(image.name)
            const destination = "./public/images/product/" + productImage;

            image.mv(
                destination,
                async (error) => {
                    if (error) {
                        return res.send({ msg: "Unable to upload image", flag: 0 })
                    } else {
                        const product = new productModel({
                            ...req.body,
                            thumbnail: productImage,
                            colors: JSON.parse(req.body.colors)
                        })

                        await product.save().then(() => {
                            res.send({ msg: "Product created successfully", flag: 1 })
                        }).catch((err) => {
                            return res.send({ msg: "Enable to create product", flag: 0 })

                        })
                    }
                }
            )

        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async getdata(req, res) {
        try {
            const id = req.params.id;
            const filterQuery = {};
            if (req.query.categorySlug) {
                const category = await categoryModel.findOne({ slug: req.query.categorySlug });
                filterQuery.categoryID = category._id
            }
            if (req.query.colorslug) {
                const color = await colorModel.findOne({ slug: req.query.colorslug });
                filterQuery.colors = { $in: [color._id] };
            }

            if (id) {
                product = await productModel.findById(id)
            } else {
                product = await productModel.find(filterQuery).limit(req.query.limit || 0).populate(["categoryID", "colors"]);
            }
            if (!product) {
                return res.send({ msg: "No Product found", flag: 0 });
            }
            res.send({ msg: "Product fethed successfully", flag: 1, product })

        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async status(req, res) {
        try {
            const id = req.params.id;
            const flag = req.body.flag;
            const product = await productModel.findById(id)
            const productStatus = {};
            let msg = ""
            if (flag === 1) {
                productStatus.status = !product.status;
                msg = "status"
            }
            else if (flag === 2) {
                productStatus.stock = !product.stock;
                msg = "stock"
            }
            else if (flag === 3) {
                productStatus.topSelling = !product.topSelling;
                msg = "topSelling"
            }
            if (product) {
                await productModel.updateOne(
                    { _id: id },
                    { $set: productStatus }
                ).then(
                    () => {
                        res.send({ msg: `Product ${msg} update`, flag: 1 })
                    }
                ).catch(
                    () => {
                        res.send({ msg: `Unable to update product ${msg}`, flag: 0 })
                    }
                )
            }

        } catch (error) {
            console.log(error);
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async delete(req, res) {
        try {
            const id = req.params.id;
            const product = await productModel.findById(id)
            if (product) {
                await productModel.deleteOne({ _id: id })
                unlinkSync("./public/images/product/" + product.thumbnail)
                res.send({ msg: "product delete", flag: 1 })
            }

        }
        catch (error) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async update(req, res) {
        try {
            console.log(req.files.thumbnail);
            
            const id = req.params.id;
            const image = req.files && req.files.thumbnail ? req.files.thumbnail : null;
        
            const product = await productModel.findById(id);

            if (!product) {
                return res.send({ msg: "No product found", flag: 0 });
            }

            const updateData = {
                ...req.body,
                colors: JSON.parse(req.body.colors)
            };

            if (image) {
                const productImage = createuniqueimage(image.name);
                const destination = "./public/images/product/" + productImage;

                const mv = util.promisify(image.mv);
                await mv(destination);

                updateData.thumbnail = productImage;
            }

            await productModel.updateOne({ _id: id }, updateData);
            return res.send({ msg: "Product updated successfully", flag: 1 });

        } catch (error) {
            console.error(error);
            return res.send({ msg: "Internal Server Error", flag: 0 });
        }
    },

    async multiple(req, res) {
        try {
            const id = req.params.id
            const product = await productModel.findById(id)
            const allimages = product.images ?? [];
            const allPromise = [];
            if (product) {
                const images = req.files.images;
                for (img of images) {
                    const productImage = createuniqueimage(img.name)
                    const destination = "./public/images/product/" + productImage;
                    allimages.push(productImage)
                    allPromise.push(img.mv(destination))

                }

                await Promise.all(allPromise)
                await productModel.updateOne(
                    { _id: id }, { images: allimages }
                ).then(
                    () => {
                        res.send({ msg: "Product images upload", flag: 1 })
                    }
                ).catch(
                    () => {
                        res.send({ msg: "Product images not upload", flag: 0 })

                    }
                )




            }

        } catch (error) {
            console.log(error);

            res.send({ msg: "Internal Server Error", flag: 0 })
        }
    }





}


module.exports = productController;