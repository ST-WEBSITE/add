const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // ⬅️ ضروري لتحديد مجلد public
require("dotenv").config(); // ✅ تحميل متغيرات البيئة من .env

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ تقديم ملفات الواجهة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// ✅ تعريف نموذج الطالب
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

// ✅ مسار API لتسجيل طالب
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

// ✅ fallback لأي مسار غير معروف → يقدم index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
