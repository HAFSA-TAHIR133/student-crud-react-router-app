import { useRef, useEffect, useState } from 'react';

function AddStudent({ student = [], setStudent }) {
    const [name, setName] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [department, setDepartment] = useState("");
    const [batch, setBatch] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if (!name.trim() || !rollNo.trim()) return; 

        const nextId = student.length > 0 ? Math.max(...student.map(s => s.id)) + 1 : 1;

        const newStudent = {
            id: nextId,
            name: name,
            rollNo: rollNo,
            department: department,
            batch: batch
        };

        setStudent([...student, newStudent]);
      
        setName("");
        setRollNo("");
        setDepartment("");
        setBatch("");
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            <form className='addStudentForm' onSubmit={handleSubmit}>

                <label htmlFor="rollNo">Enter Roll No:</label>
                <input 
                    type="text" 
                    id="rollNo" 
                    placeholder='Enter roll no'
                    value={rollNo} 
                    onChange={(e) => setRollNo(e.target.value)} 
                />
                <label htmlFor="name">Enter Student Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    ref={inputRef} 
                    placeholder="Enter Name"
                />
                <label htmlFor="department">Enter Department:</label>
                <input 
                    type="text" 
                    id="department" 
                    placeholder='Enter Department'
                    value={department} 
                    onChange={(e) => setDepartment(e.target.value)} 
                />
                <label htmlFor="batch">Enter Batch:</label>
                <input 
                    type="text" 
                    id="batch" 
                    placeholder='Enter batch'
                    value={batch} 
                    onChange={(e) => setBatch(e.target.value)} 
                />

                <button type="submit">Add Student</button>
            </form>
        </>
    );
}

export default AddStudent;