/**
 * Created by simvolice on 04.08.2017 16:24
 */





const express = require('express');
const router = express.Router();

const RoleService = require('../services/RoleService');




router.get('/getroles', async (req, res, next) =>{

    res.json({"code": 0, "resultFromDb": await RoleService.getAllRoles()});

});






module.exports = router;