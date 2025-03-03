import React from "react";
import { Button, Table, Title, Select } from "@mantine/core";

const ManageGrades = ({ grades, setGrades }) => {
  const updateGrade = (id, newGrade) => {
    setGrades(grades.map((grade) => (grade.id === id ? { ...grade, grade: newGrade } : grade)));
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  return (
    <div className="section">
      <Title order={2}>Manage Grades</Title>
      <div className="table-container">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Project</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.project}</td>
                <td>
                  <Select
                    data={["A", "B", "C", "D", "F"]}
                    value={grade.grade}
                    onChange={(value) => updateGrade(grade.id, value)}
                  />
                </td>
                <td>
                  <Button color="red" onClick={() => deleteGrade(grade.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageGrades;
