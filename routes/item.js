const express = require('express');



const router = express.Router();

const controller = require('../controllers/itemController')


const {protect} = require('../middleware/authMiddleware');

const {checkPermissions} = require('../middleware/authMiddleware');


/*@method GET
  @public


*/
router.get('/', controller.getItems);
router.get('/:id', controller.getItem);
router.use(protect);

/*@method POST, PATCH, DELETE
  @private


*/

router.use(checkPermissions);

router.post('/', controller.createItem);



router.route('/:id').patch(controller.updateItem).delete(controller.deleteItem);




module.exports = router;


