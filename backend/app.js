const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // ✅ تحميل متغيرات البيئة من .env

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ الاتصال بقاعدة البيانات باستخدام env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
    fullName: String,
    grade: String,
    motherName: String,
    birthInfo: Date,
    guardianName: String,
    relationship: String,
    guardianPhone: String,
    guardianEmail: String,
    address: String,
    nearestPoint: String,
    nationalId: String,
    idIssuer: String,
    idIssueDate: Date,
    residenceCardNumber: String,
    residenceIssuer: String,
    residenceIssueDate: Date,
});

const Student = mongoose.model("Student", studentSchema);

app.post("/api/students", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).send("تم الحفظ");
    } catch (error) {
        console.error(error);
        res.status(500).send("فشل في الحفظ");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));