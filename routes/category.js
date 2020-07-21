var express = require("express");
var router = express.Router();
const models = require("../models");
const Category = models.category;

/* GET All Category. */
router.get("/", function (req, res, next) {
    try {
        Category.findAll()
            .then((respons) => {
                res.status(200).json({
                    status: "success",
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
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error,
        });
    }
});

/* POST New Category */
router.post("/post", (req, res) => {
    try {
        var { category_name, category_description } = req.body;

        Category.findOrCreate({
            where: {
                category_name,
            },
            defaults: {
                category_name,
                category_description,
            },
        })
            .then((result) => {
                if (result[1]) {
                    res.status(201).json({
                        status: "berhasil",
                        message: `category ${category_name} berhasil ditambah`,
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
                    error_data: err,
                });
            });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error,
        });
    }
});

/* GET Detail Category. */
router.get("/:id", (req, res) => {
    try {
        var { id } = req.params;
        Category.findOne({
            where: { id },
        })
            .then((result) => {
                res.status(200).json({
                    status: "success",
                    message: "data berhasil ditampilkan",
                    data: result,
                });
            })
            .catch((err) =>
                res.status(400).json({
                    status: "error",
                    message: err,
                })
            );
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error,
        });
    }
});

router.put("/:id/edit", (req, res) => {
    try {
        var { id } = req.params;
        var { category_name, category_description } = req.body;

        const data = {
            category_name,
            category_description,
        };
        Category.update(data, {
            where: { id },
        })
            .then((result) => {
                res.status(202).json({
                    status: "success",
                    message: "data berhasil diubah",
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
            status: "error",
            message: error,
        });
    }
});

router.delete("/:id/delete", (req, res) => {
    try {
        var { id } = req.params;

        Category.destroy({
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
            status: "error",
            message: error,
        });
    }
});

module.exports = router;
