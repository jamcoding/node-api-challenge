const express = require('express');

const Project = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "there was an error retreiving the project" })
        })
})

router.post('/', validateBody, (req, res) => {
    Project.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "there was a problem posting the project" })
        })
})

router.get('/:id', validateId, (req, res) => {
    Project.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "the project with this ID doesn't exist" })
        })
})

router.get('/:id/actions', validateId, (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "the project with this ID doesn't exist"})
        })
})

router.put('/:id', validateBody, validateId, (req, res) => {
    Project.update(req.params.id, req.body)
        .then(projectUpdate => {
            if (projectUpdate) {
                res.status(200).json(projectUpdate)
            } else {
                res.status(404).json({ message: "this project couldn't be found. "})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "error updating the prjoect" })
        })
})

router.delete('/:id', validateId, (req, res) => {
    Project.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "this project has been deleted." })
            } else {
                res.status(404).json({ message: "this projet could not be found." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "error removing the project." })
        })
})

function validateId(req, res, next) {
    Project.get(req.params.id)
        .then(id => {
            if (id) {
                next();
            } else {
                res.status(400).json({ message: "ID not found." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error with ID" })
        })
};

function validateBody(req, res, next) {
    if (!req.body.name) {
        res.status(400).json({ message: "Project requires a name" })
    } else if (!req.body.description) {
        res.status(400).json({ message: "Project requires a description" })
    } else {
        next();
    }
}

module.exports = router;