import React, { useState, useEffect } from "react";
import { Button, Table, Title, Select, Pill, Modal, Textarea, Alert, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {updateGrade, deleteGrade, fetchJudgeGrades} from "../reducers/gradeSlice";

const ManageGrades = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [grades, setGrades] = useState([{}]);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.grades.status);
  const gradeInfo = useSelector((state) => state.grades.grades);
  const user = useSelector((state)=>state.auth.user)

  useEffect(() => {
    status === "idle" ? dispatch(fetchJudgeGrades(user._id)) : setGrades([{}]);
    setGrades(gradeInfo);
  }, [status, dispatch]);

  const handleDeleteGrade = (id) => {
    dispatch(deleteGrade(id));
    //setGrades(grades.filter((grade) => grade.id !== id));
  };

  const handleEditClick = (id) => {
    const grade = grades.find((grade) => grade._id === id);
    setEditingGrade(grade);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingGrade.concept_tier || !editingGrade.concept_mastery || !editingGrade.presentation || !editingGrade.creativity) return;
    const updatedGrade = {...editingGrade, overall_grade: (editingGrade.concept_mastery + editingGrade.creativity + editingGrade.presentation)}
    dispatch(updateGrade({"_id":editingGrade._id, "updatedGradeData": updatedGrade}));
    setShowEditModal(false);
    setEditingGrade(null);
  };
  return (
    <div className="section">
      {user ? 
      <Alert variant="light" color="green" title="Showing Grades For This Judge:">
          <Text>Name: {user.first_name} {user.last_name}</Text>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
      </Alert>: 
      <Alert variant="light" color="red" title="Warning">Can't find your judge info!</Alert>
      }
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
            {grades?.map((grade,index) => (
              <tr key={grade._id || index+100}>
                <td>{grade.project?.[0]?.name}</td>
                <td>{grade.concept_tier}</td>
                <td>{grade.concept_mastery}</td>
                <td>{grade.presentation}</td>
                <td>{grade.creativity}</td>
                <td>
                  <Button color="blue" onClick={() => handleEditClick(grade._id)}>Edit</Button>
                  <Button color="red" onClick={() => handleDeleteGrade(grade._id)}>Delete</Button>
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
              data={["Beginner","Intermediate","Advanced"]}
              value={editingGrade.concept_tier}
              onChange={(value) => setEditingGrade({ ...editingGrade, concept_tier: value })}
            />
            <Select
              label="Concept Mastery"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.concept_mastery.toString() ?? null}
              onChange={(value) => setEditingGrade({ ...editingGrade, concept_mastery: parseInt(value) })}
            />
            <Select
              label="Presentation"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.presentation.toString() ?? null}
              onChange={(value) => setEditingGrade({ ...editingGrade, presentation: parseInt(value) })}
            />
            <Select
              label="Creativity"
              data={["1", "2", "3", "4", "5"]}
              value={editingGrade.creativity.toString() ?? null}
              onChange={(value) => setEditingGrade({ ...editingGrade, creativity: parseInt(value) })}
            />
            <Textarea
              label="Overall Comments"
              value={editingGrade.overall_comments ?? null}
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
