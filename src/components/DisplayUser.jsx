import UpdateRecord from './updateRecord.jsx'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function DisplayUser({student,setStudent}){
    //keep the id of editing student
    const [editingStudent, setEditingStudent] = useState(null);
    // handle delete
    const handleDelete =(id)=>{
        const filter_deleted_list = student.filter(s => s.id != id);
        setStudent(filter_deleted_list);
        localStorage.setItem("studentList",JSON.stringify(filter_deleted_list));

    }


    const savedStudents = localStorage.getItem("studentList"); 

    const studentsArray = savedStudents ? JSON.parse(savedStudents) : [];
    let count =1;
    return (<>
    <h3 className="display-student-heading">All Students Record</h3>
        {studentsArray.map((s)=>{
            return(
                <div className="display-student-records" key={s.id}>
                    <h3>Student: {count++}</h3>
                    <h4>Roll No: {s.rollNo}</h4>
                    <h4>Student Name: {s.name}</h4>
                    <h4>Department: {s.department}</h4>
                    <h4>Batch: {s.batch}</h4>
                    <div className="edit-btns">
                        <Link to={`/updateStudent/${s.id}`}>
                        <button>Update Record</button>
                        </Link>
                        <button onClick={()=>{handleDelete(s.id)}}>Delete</button>
                    </div>
                </div>
            )

        })}

    </>);
}
export default DisplayUser;