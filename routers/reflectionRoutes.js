const router = require("express").Router();
const ReflectionController = require("../controllers/reflectionController");

router.post("/reflection", ReflectionController.createReflection);
router.get("/:id", ReflectionController.getReflectionByID);
router.put("/:id", ReflectionController.updateReflectionByID);
router.delete("/:id", ReflectionController.deleteReflectionByID);

module.exports = router;
