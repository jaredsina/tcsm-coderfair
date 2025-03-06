import React, { useState } from 'react';
import { Button, TextInput, Textarea } from '@mantine/core';

const ManageCoderfair = () => {
  return (
    <div className="section">
      <h2>Manage Coderfair</h2>
      <Button onClick={() => setShowForm(true)} className="action-button">
        Create Coderfair
      </Button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>CoderfairName</td>
              <td>CoderfairDate</td>
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

export default ManageCoderfair;