var express = require("express");
var router = express.Router();
const models = require("../models");
const product = require("../models/product");
const Product = models.product;
const Category = models.category;

/* GET All Product. */
router.get("/", function (req, res) {
    try {
        Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["category_name"],
                },
            ],
        })
            .then((respons) => {
                res.status(200).json({
                    status: "OK",
                    message: "data berhasil ditampilkan",
                    data: respons,
                });
            })
            .catch((err) =>
                res.status(400).json({
                    status: "error",
                    message: err,
                })
            );
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
});

router.get("/:id", function (req, res) {
    try {
        var { id } = req.params;

        Product.findOne({
            where: { id },
            include: [
                {
                    model: Category,
                    attributes: ["category_name"],
                },
            ],
        })
            .then((respons) => {
                res.status(200).json({
                    status: "OK",
                    message: "data berhasil ditampilkan",
                    data: respons,
                });
            })
            .catch((err) =>
                res.status(400).json({
                    status: "error",
                    message: err,
                })
            );
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
});

router.get("/category/:id_category", function (req, res) {
    try {
        var { id_category } = req.params;

        Product.findAll({
            where: { id_category },
            include: [
                {
                    model: Category,
                    attributes: ["category_name"],
                },
            ],
        })
            .then((respons) => {
                res.status(200).json({
                    status: "OK",
                    message: "data berhasil ditampilkan",
                    data: respons,
                });
            })
            .catch((err) =>
                res.status(400).json({
                    status: "error",
                    message: err,
                })
            );
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
});

router.post("/post", (req, res) => {
    try {
        var {
            name,
            description,
            stock,
            available,
            image,
            id_category,
            price,
        } = req.body;

        Product.findOrCreate({
            where: {
                name,
            },
            defaults: {
                name,
                description,
                stock,
                available,
                image,
                id_category,
                price,
            },
        })
            .then((result) => {
                if (result[1]) {
                    res.status(201).json({
                        status: "berhasil",
                        message: "data berhasil ditambahkan",
                    });
                } else {
                    res.status(409).json({
                        status: "failed",
                        message: "data sudah tersedia",
                    });
                }
            })
            .catch((err) => {
                res.status(401).json({
                    status: "failed",
                    message: "data tidak berhasil ditambah",
                    data: err,
                });
            });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
});

router.put("/:id/edit", (req, res) => {
    try {
        var { id } = req.params;
        var {
            name,
            description,
            stock,
            available,
            image,
            id_category,
            price,
        } = req.body;

        const data = {
            name,
            description,
            stock,
            available,
            image,
            id_category,
            price,
        };

        Product.update(data, {
            where: { id },
        })
            .then((result) => {
                res.status(202).json({
                    status: "success",
                    message: "data berhasil diubah",
                });
            })
            .catch((error) => {
                res.status(403).json({
                    status: "failed",
                    message: error,
                });
            });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
});

router.delete("/:id/delete", (req, res) => {
    try {
        var { id } = req.params;

        Product.destroy({
            where: { id },
        })
            .then((result) => {
                res.status(202).json({
                    status: "success",
                    message: "data berhasil di hapus",
                });
            })
            .catch((err) => {
                res.status(403).json({
                    status: "failed",
                    message: err,
                });
            });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
});

module.exports = router;
