const router = require("express").Router()
const Products = require('./products-model')
const { noMissingInformation, checkUserIdExists } = require('./products-middleware')

router.get("/", (req, res, next) => {
  Products.get()
    .then(productsList => {
      res.status(200).json(productsList);
    })
    .catch(next)
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params
  Products.getById(id)
    .then(currentproducts => {
      res.status(200).json(currentproducts)
    })
    .catch(next)
})

router.put("/:id", (req, res, next) => {
  const { id } = req.params
  Products.update(id, req.body)
    .then(()=> {
        Products.getById(id)
            .then(updatedproducts => {
                res.status(200).json(updatedproducts)
            })
    })
    .catch(next)
})

router.delete("/:id", (req, res, next) => {
    const { id } = req.params
    Products.remove(id)
        .then(removed => {
            res.status(200).json({message: "products are sold out"})
        })
        .catch(next)
})

router.post("/", noMissingInformation, checkUserIdExists, (req, res, next) => {
    const products = req.body;
  
    Products.add(products)
      .then(addedproducts => {
        res.status(201).json(addedproducts)
      })
      .catch(next)
});

module.exports = router