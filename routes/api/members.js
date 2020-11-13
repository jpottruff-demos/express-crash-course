// Import express and setup the Router
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const members = require('../../models/Members');



// Send back some JSON data via routes

// Get all members
// NOTE how we are now using router.get instead of app.get (see imports above) 
// NOTE we have defined /api/members portion of the route in index.js
// app.get('/api/members', (req, res) => res.json(members));
router.get('/', (req, res) => res.json(members));

// Get a single member
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    (found) ?
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
        : res.status(400).json({msg: `No member with id ${req.params.id}`});
});

// CREATE a member
router.post('/', (req, res) => {

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    // This would normally be a DB call
    members.push(newMember);
    res.json(members);

    // This is just an example for handlebars redirects
    // res.redirect('/');
});

// Update a member
router.put('/:id', (req, res) => {
    const updateData = req.body;
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const position = members.map(member => member.id).indexOf(parseInt(req.params.id));
        const member = members[position];

        member.name = updateData.name ? updateData.name : member.name; 
        member.email = updateData.email ? updateData.email : member.email; 
        res.json({msg: 'Member updated', member});

    } else {
        res.status(400).json({msg: `No member with id ${req.params.id}`});
    }
});

// Delete a member
router.delete('/:id', (req, res) => {
    const updateData = req.body;
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'Simulate member delete', 
            // Simulating Delete here
            members: members.filter(member => member.id !== parseInt(req.params.id)) 
        });
    } else {
        res.status(400).json({msg: `No member with id ${req.params.id}`});
    }
});




// Need to export the router 
module.exports = router;