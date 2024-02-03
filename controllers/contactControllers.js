const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route get /api/contacts
//@access public
const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

const createContact = asyncHandler( async (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({
        name, email, phone, user_id : req.user.id
    }); 

    // res.status(201).json({message : req.body});
    res.status(201).json(contact);
});

const getcontact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

const updatecontact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    req.body.user_id = req.user.id;
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );

    res.status(200).json(updateContact);
});

const deletecontact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});

module.exports = { 
    getContacts,
    createContact, 
    getcontact, 
    updatecontact, 
    deletecontact, 
};

