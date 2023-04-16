const router = require("express").Router();
const userRouters = require("./userRoutes");
const reflectionRouters = require("./reflectionRoutes");
const authentication = require("../middlewares/authentication");

router.use("/users", userRouters);

// router.use(authentication);

router.use("/reflections", reflectionRouters);

module.exports = router;
