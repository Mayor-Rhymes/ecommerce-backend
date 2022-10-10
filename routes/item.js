const express = require('express');



const router = express.Router();

const controller = require('../controllers/itemController')


const {protect} = require('../middleware/authMiddleware');
/*@method GET
  @private 


*/
router.get('/', controller.getItems);
router.use(protect);


router.post('/', controller.createItem);

router.route('/:id').patch(controller.updateItem).delete(controller.deleteItem);



router



module.exports = router;


