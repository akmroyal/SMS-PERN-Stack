const {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
} = require('../controller/students.js');
const router = require('express').Router();


router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);


module.exports = router;


