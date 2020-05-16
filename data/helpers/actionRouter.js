const express = require('express');

const Action = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ message: "there was error receiving the action" })
        })
})

router.get('/:id', validateId, (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ message: "the project with this ID doesn't exist" })
        })
})

router.post('/', validateBody, (req, res) => {
    Action.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ message: "there was a problem posting the action" })
        })
})

router.put('/:id', validateBody, validateId, (req, res) => {
    Action.update(req.params.id, req.body)
        .then(actionUpdate => {
            if (actionUpdate) {
                res.status(200).json(actionUpdate)
            } else {
                res.status(404).json({ message: "the action with this ID doesn't exist "})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "error updating the action"})
        })
})

router.delete('/:id', validateId, (req, res) => {
    Action.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "this action has been deleted." })
            } else {
                res.status(404).json({ message: "this action couldn't be found "})
            }
        }) 
        .catch(error => {
            res.status(500).json({ message: "error removing the action" })
        })
})

function validateId(req, res, next) {
    Action.get(req.params.id)
        .then(id => {
            if (id) {
                next();
            } else {
                res.status(400).json({ message: "ID not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error with ID" })
        })
}

function validateBody(req, res, next) {
    if(!req.body.description) {
        res.status(400).json({ message: "Action requires a description" })
    } else if (!req.body.notes) {
        res.status(400).json({ message: "Action requires notes" })
    } else if (!req.body.project_id) {
        res.status(400).json({ message: "Action requires project ID" })
    } else {
        next();
    }
}

module.exports = router;