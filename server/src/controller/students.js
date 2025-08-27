const pool = require('../db/db.js');

const getAllStudents = async (req, res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM students");
        res.json({
            message: "All students data fetched Successfully !!",
            data: allStudents.rows
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await pool.query("SELECT * FROM students WHERE st_id = $1", [id]);

        if (student.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.json({ message: "Studnet data fetched Successfully !!", data: student.rows[0] });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const addStudent = async (req, res) => {
    try {
        const { name, age, class: studentClass, marks, gender } = req.body;
        const newStudent = await pool.query(
            "INSERT INTO students (name, age, class, marks, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, age, studentClass, marks, gender]
        );
        res.json({ message: "Student Added Successfully !!", data: newStudent.rows[0] });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, class: studentClass, marks, gender } = req.body;
        const result = await pool.query(
            "UPDATE students SET name = $1, age = $2, class = $3, marks = $4, gender = $5 WHERE st_id = $6 RETURNING *",
            [name, age, studentClass, marks, gender, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Updated Successfully !!", data: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM students WHERE st_id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully", deleted: result.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
}
