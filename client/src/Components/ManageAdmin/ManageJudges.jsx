import React from 'react';
import { Button, TextInput, Textarea } from '@mantine/core';

const ManageJudges = () => {
  return (
    <div className="section">
      <h2>Manage Judges</h2>
      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Judge Account
      </Button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>JudgeName</td>
              <td className="actions-column">
                <Button className="edit-btn" size="xs">
                  Edit
                </Button>

                <Button className="delete-btn" size="xs">
                  Delete
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageJudges;