import { useState } from 'react';
import './App.css';

function App() {
  const [studentData, setStudentData] = useState({});
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedStudents = students.map((student) => {
        if (student.id === editStudentId) {
          return { ...student, ...studentData };
        }
        return student;
      });
      setStudents(updatedStudents);
      setEditMode(false);
      setEditStudentId(null);
    } else {
      const newStudent = { ...studentData, id: Date.now() };
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }
    setStudentData({});
  };

  const handleEdit = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    if (studentToEdit) {
      setStudentData(studentToEdit);
      setEditMode(true);
      setEditStudentId(studentId);
    }
  };

  const handleDelete = (studentId) => {
    const updatedStudents = students.filter((student) => student.id !== studentId);
    setStudents(updatedStudents);
  };

  return (
    <>
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter student name"
          value={studentData.name || ''}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter student age"
          value={studentData.age || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter student address"
          value={studentData.address || ''}
          onChange={handleChange}
        />
        <button>{editMode ? 'Update student' : 'Add student'}</button>
      </form>
      <ul>
        {students.map((student) => (
          <div key={student.id} className='student'>
            <p>Name: {student.name}</p>
            <p>Age: {student.age}</p>
            <p>Address: {student.address}</p>
            <button onClick={() => handleEdit(student.id)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
