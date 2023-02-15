/* const Student = require("../models/Student.model");
const downloadResource  = require('../utils/utilCsv');

const controller = {};

controller.download = async (req, res) => {
 const fields = [
   {
     label: 'First Name',
     value: 'firstName'
   },
 ];
 const data = await Student.findAll();
const data = [{firstName: "Zsofia"}]
 return downloadResource(res, 'users.csv', fields, data);
}

module.exports = controller; */
