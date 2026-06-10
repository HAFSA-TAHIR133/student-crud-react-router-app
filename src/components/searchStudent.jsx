import {useMemo,useState,useRef, useEffect} from 'react'
function SearchStudent({student}){
    const saveStudents = localStorage.getItem("studentList");
    const savedStudentsList = saveStudents ? JSON.parse(saveStudents):[];

    const [searchRollNo,setSearchRollNo] =useState("");
    const filtered_students = useMemo(()=>{
        if (searchRollNo.trim() === "") {
            return [];
        }
        return savedStudentsList.filter((s)=> s.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
    );
    },[searchRollNo,student])

    const inputRef = useRef(null);
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus();
        }
        
    },[]);
    return(
        <>
            <div className='search-Student'>
                <h2>Search Student Record</h2>
                <input type='text' placeholder='Enter Roll No' value={searchRollNo} 
                onChange={(e)=> setSearchRollNo(e.target.value)} ref={inputRef} />
                {
                filtered_students.length === 0 && (
                    <p>No student found</p>)
                }
                {filtered_students
                && (
                    
                    <div className='search-result'>
                                {filtered_students.map((s)=>{
                                    return (
                                        <div className='Match-record'key={s.id}>
                                                <h4>Id: {s.id}</h4>
                                                <h4>Roll No: {s.rollNo}</h4>
                                                <h4>Student Name: {s.name}</h4>
                                                <h4>Department: {s.department}</h4>
                                                <h4>Batch: {s.batch}</h4>
                                            </div>
                                    )
                                })}
                        </div>
                )}

            </div>
        </>
    )

}
export default SearchStudent;