var studentsInfoArray=

[
    {
        name: {firstName: "Sunil", lastName: "Gupta"},
        class: 16,
        subjects: ["Maths", "Physics", "English", "Chemistry"],
        attendance: {
            January: "100%",
            February: "99%",
            March: "100%"
        }
    },
    {
        name: {firstName: "Sunil", lastName: "Gupta"},
        rollNo: 16,
        subjects: ["Maths", "Physics", "English", "Chemistry"],
        attendance: {
            January: "100%",
            February: "99%",
            March: "100%"
        }
    },

    {
        name: {firstName: "Alun", lastName: "Hill"},
        rollNo: 12,
        subjects: ["Small Business", "Medium Business", , "Journalist"],
        attendance: {
            January: "100%",
            February: "100%",
            March: "100%"
        }
    }
];

db.studentsInfoCollection.insert(studentsInfoArray);
