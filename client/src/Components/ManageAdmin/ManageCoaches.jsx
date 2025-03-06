import React, { useState } from 'react';
import { Button, TextInput, Textarea } from '@mantine/core';

const ManageCoaches = () => {
  return (
    <div className="section">
      <h2>Manage Coaches</h2>
      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Coach Account
      </Button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>CoachName</td>
              <td>CoachContact</td>
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

export default ManageCoaches;