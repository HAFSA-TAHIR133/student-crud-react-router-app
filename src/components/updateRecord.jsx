import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UpdateRecord({ student, setStudent }) {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    batch: ''
  });

  useEffect(() => {
    const currentStudent = student.find((st) => st.id === Number(id));
    if (currentStudent) {
      setFormData(currentStudent);
    }
  }, [id, student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    const updatedList = student.map((st) => 
      st.id === Number(id) ? { ...st, ...formData } : st
    );
    
    setStudent(updatedList); 
    alert("Record Updated Successfully!");
    navigate('/showStudents'); 
  };

  return (
    <div className="updated-form">
      <h2>Update Student Record</h2>
      <form onSubmit={handleUpdateSubmit}>
        <label>
          Student Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Roll Number:
          <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} />
        </label>
        <label>
          Department:
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </label>
        <label>
          Batch:
          <input type="text" name="batch" value={formData.batch} onChange={handleChange} />
        </label>
        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
}

export default UpdateRecord;