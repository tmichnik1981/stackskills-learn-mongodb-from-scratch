db.studentInfo.insert(
    {
        name: {firstName: "John", lastName: "Doe"},
        class: 6,
        rollNo: 23,
        subjects: ["Maths", "Physics", "English", "Chemistry"],
        attendance: {
            January: "90%",
            February: "85%",
            March: "98%"
        }
    }
);
db.studentInfo.insert(
    {
        name: {firstName: "Sunil", lastName: "Gupta"},
        rollNo: 24,
        subjects: ["Maths", "Physics", "English", "Chemistry"],
        attendance: {
            January: "97%",
            February: "99%",
            March: "100%"
        }
    }
);
db.studentInfo.insert(
    {
        name: {firstName: "Jonny", lastName: "Jon"},
        rollNo: 27,
        subjects: ["Maths", "Physics", "English", "Chemistry"],
        attendance: {
            January: "87%",
            February: "99%",
            March: "100%"
        }
    }
);
