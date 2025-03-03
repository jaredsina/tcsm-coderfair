import React, { useState } from "react";
import { Button, Table, Title, Select, Pill, Modal, Textarea } from "@mantine/core";

const ManageGrades = ({ grades, setGrades }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);

  const updateGrade = (id, field, value) => {
    setGrades(grades.map((grade) =>
      grade.id === id ? { ...grade, [field]: value } : grade
    ));
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  const handleEditClick = (grade) => {
    setEditingGrade(grade);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setGrades(grades.map((grade) =>
      grade.id === editingGrade.id ? editingGrade : grade
    ));
    setShowEditModal(false);
    setEditingGrade(null);
  };

  return (
    <div className="section">
      <Title order={2}>Manage Grades</Title>
      <div className="table-container">
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Project</th>
              <th>Concept Tier</th>
              <th>Concept Mastery</th>
              <th>Presentation</th>
              <th>Creativity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.project}</td>
                <td>{grade.concept_tier}</td>
                <td>{grade.concept_mastery}</td>
                <td>{grade.presentation}</td>
                <td>{grade.creativity}</td>
                <td>
                  <Button color="blue" onClick={() => handleEditClick(grade)}>Edit</Button>
                  <Button color="red" onClick={() => deleteGrade(grade.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        opened={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingGrade(null);
        }}
        title="Edit Grade"
        centered
      >
        {editingGrade && (
          <>
            <Select
              label="Concept Tier"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.concept_tier}
              onChange={(value) => setEditingGrade({ ...editingGrade, concept_tier: value })}
            />
            <Select
              label="Concept Mastery"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.concept_mastery}
              onChange={(value) => setEditingGrade({ ...editingGrade, concept_mastery: value })}
            />
            <Select
              label="Presentation"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.presentation}
              onChange={(value) => setEditingGrade({ ...editingGrade, presentation: value })}
            />
            <Select
              label="Creativity"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.creativity}
              onChange={(value) => setEditingGrade({ ...editingGrade, creativity: value })}
            />
            <Textarea
              label="Overall Comments"
              value={editingGrade.overall_comments || ""}
              onChange={(event) => setEditingGrade({ ...editingGrade, overall_comments: event.currentTarget.value })}
              placeholder="Enter overall comments"
              mt="md"
            />
            <Button fullWidth mt="md" onClick={handleSaveEdit}>Save Changes</Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ManageGrades;
