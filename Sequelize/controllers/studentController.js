const { where } = require('sequelize');
const db = require('../models/index.js')
const path = require('path');

const Student = db.student


// 1. add student  -- post

const addstudent = async (req, res) => {
    let newstudent = {
        rollno: req.body.rollno,
        name: req.body.name,
        city: req.body.city,
        degree: req.body.degree,
        age: req.body.age
    }
    const student = await Student.create(newstudent);
    res.status(200).send(student);
    console.log(newstudent);
}

// 2. remove student by id -- delete

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    await Student.destroy({ where: { rollno: id } });
    console.log("You are deleting : "+id+"  student ----------------------------------")
    res.status(200).send("Student is deleted");
}

// 3. update student by id -- put

const updateStudent = async (req, res) => {
    const id = req.params.id;
    const student = await Student.update(req.body, { where: { rollno: id } });
    res.status(200).send(student);
}

// 4. get student by id -- get

const getStudentByRollno = async (req, res) => {
    const id = req.params.id
    const student = await Student.findOne({ where: { rollno: id } })
    res.status(200).send(student);
}

// 5. get studentall -- get

const getAllStudent = async (req, res) => {
    const students = await Student.findAll({});
    res.status(200).send(students);
}


module.exports = {
    addstudent,
    getAllStudent,
    getStudentByRollno,
    updateStudent,
    deleteStudent
}