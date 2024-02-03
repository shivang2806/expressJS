const express = require('express');
const router = express.Router();
const { getContacts,createContact,getcontact,updatecontact,deletecontact } = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHeader');

router.route('/').get(validateToken, getContacts).post(validateToken, createContact);
router.route('/:id').get(validateToken, getcontact).put(validateToken, updatecontact).delete(validateToken, deletecontact);

module.exports = router;