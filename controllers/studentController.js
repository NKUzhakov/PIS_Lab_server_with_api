const studentData = require("../studentData.js");

exports.findByLogin = function(queryLogin){
    if(!queryLogin) throw "login is undefined";
    const student = studentData.data.find(stud=>{
        return stud.login == queryLogin
    });
    
    if(!student) throw "not found";
    return student;
}