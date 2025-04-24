const btnSearch = document.querySelector("#searchBtn");
btnSearch.addEventListener("click", ()=>{
    const login = document.querySelector("form #login").value; 
    if(!login){
        alert("Всі поля повинні бути заповнені...");
        return;
    }
    findStudent(login, student=>{
        const {fname, lname, course, group} = student;
        const studentDataEl = document.querySelector("#studentData");
        studentDataEl.style.display="flex";
        studentDataEl.innerHTML = `
            <p>Студент: ${fname} ${lname} <br>            
            Курс: ${course}<br>
            Група: ${group}</p>
        `
    });
});

function findStudent(login, callback){
    fetch(`http://localhost:3000/student/${login}`,{
        "method": "GET",
        headers: {    
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        if(!res ||!res.ok) throw "The error happened when querying server";
        return res;
    }).then(res=>res.json())
    .then(data=>callback(data))
    .catch(alert);
}