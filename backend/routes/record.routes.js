const Router = require("express");
const router = new Router();
const recordController = require("../controllers/record.controller")
router.post("/record", recordController.createRecord)
router.get("/record", recordController.getRecords)
router.get("/record/:id", recordController.getOneRecord)
router.put("/record/:id", recordController.updateRecord)
router.delete("/record/:id", recordController.deleteRecord)
module.exports = router