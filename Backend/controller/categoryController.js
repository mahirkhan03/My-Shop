const { createuniqueimage } = require("../helper");
const categoryModel = require("../model/categoryModel");
const { unlinkSync } = require("fs");
const productModel = require("../model/productModel");
const { timeStamp } = require("console");


const categoryController = {
    async create(req, res) {
        try {

            const image = req.files.Image
            const { name, slug } = req.body;
            if (!name || !slug || !image) {
                return res.send({ msg: "All Field are required", flag: 0 })
            }

            const categoryimage = createuniqueimage(image.name)
            const destination = "./public/images/category/" + categoryimage;

            image.mv(
                destination,
                async (error) => {
                    if (error) {
                        return res.send({ msg: "Unable to upload image", flag: 0 })
                    } else {
                        const category = new categoryModel({
                            name: name,
                            slug: slug,
                            image: categoryimage
                        })

                        await category.save().then(() => {
                            res.send({ msg: "Category created uccessfully", flag: 1 })
                        }).catch((err) => {
                            return res.send({ msg: "Enable to create category", flag: 0 })

                        })

                    }
                }
            )
        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },
    async  getdata(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      const category = await categoryModel.findById(id);
      if (!category) {
        return res.send({ msg: "No Category found", flag: 0 });
      }
      return res.send({ msg: "Category fetched successfully", flag: 1, category });
    } else {
      const categories = await categoryModel.find();
      const allCategories = await Promise.all(
        categories.map(async (category) => {
          const productCount = await productModel.countDocuments({ categoryID: category._id });
          return {
            ...category.toObject(),
            productCount,
          };
        })
      );
      allCategories.sort((a, b) => b.productCount - a.productCount);
      return res.send({ msg: "Categories fetched successfully", flag: 1, categories: allCategories });
    }
  } catch (err) {
    console.error(err);
    return res.send({ msg: "Internal Server Error", flag: 0 });
  }
}
,
    async status(req, res) {
        try {
            const id = req.params.id;
            const category = await categoryModel.findById(id);
            if (!category) {
                return res.send({ msg: "No Categories found", flag: 0 });
            }
            await categoryModel.updateOne(
                { _id: id },
                { status: !category.status }
            ).then(
                () => {
                    return res.send({ msg: 'Category update', flag: 1 })
                }
            ).catch(
                () => {
                    return res.send({ msg: 'Enable to update Category ', flag: 0 })
                }
            )

        } catch (error) {
            console.log(error);
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const category = await categoryModel.findById(id)
            await categoryModel.deleteOne(
                {
                    _id: category._id
                }
            ).then(
                () => {
                    unlinkSync("./public/images/category/" + category.image)

                    res.send({ msg: "Category delete", flag: 1 })
                }
            ).catch(
                () => {
                    res.send({ msg: "Enable to delete category", flag: 0 })
                }
            )


        } catch (error) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }
    },

    async update(req, res) {
        try {
            const id = req.params.id;
            const image = req.files && req.files.image ? req.files.image : null;
            const category = await categoryModel.findById(id);
            if (!category) {
                return res.send({ msg: "No Categories found", flag: 0 });
            }

            if (image) {
                const categoryimage = createuniqueimage(image.name)
                const destination = "./public/images/category/" + categoryimage;
                image.mv(
                    destination,
                    async (err) => {
                        if (err) {
                            return res.send({ msg: "Unable to update category image", flag: 0 })
                        } else {
                            await categoryModel.updateOne(
                                {
                                    _id: id
                                },
                                {
                                    name: req.body.name,
                                    slug: req.body.slug,
                                    image: categoryimage
                                }
                            ).then(() => {
                                res.send({ msg: "Category update successfully", flag: 1 })
                            }).catch((err) => {
                                return res.send({ msg: "Enable to update category", flag: 0 })
                            })
                        }
                    }
                )

            } else {
                await categoryModel.updateOne(
                    {
                        _id: id
                    },
                    {
                        name: req.body.name,
                        slug: req.body.slug,
                    }
                ).then(() => {
                    res.send({ msg: "Category update successfully", flag: 1 })
                }).catch((err) => {
                    return res.send({ msg: "Enable to update category", flag: 0 })

                })
            }

        } catch (error) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    }


}


module.exports = categoryController;