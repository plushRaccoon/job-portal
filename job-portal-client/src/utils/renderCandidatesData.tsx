import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import EditApplicationForm from '../components/application-form';

export const RenderCandidatesData = ({ item }) => (
    <>
      {item.firstName} {item.lastName}
      <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
      {item.email}
      <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
      {item.phone}
    </>
  )

export const RenderCandidatesDetails = ({ item, onDelete, onEdit }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editApplication, setEditApplication] = useState(null);

  const handleEditClick = (application) => {
    setEditApplication(application);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditApplication(null);
  };

  const handleSubmitEdit = (id) => {
    onEdit('applications', id, editApplication);
    setOpenEditModal(false);
    setEditApplication(null);
  };

  return (
    <>
      {item.applications?.map((application) => {
        const { id, cv, position: { title, status } } = application;
        return (
          <List key={id}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" color="error" onClick={() => onDelete('applications', id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText sx={{ marginRight: 10 }}>
                <Box key={id}>
                  <Box display="flex" alignItems="center" marginBottom="10px">
                    {title}
                    <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
                    {status}
                  </Box>
                  {cv}
                </Box>
              </ListItemText>
              <ListItemIcon>
                <IconButton size="large" aria-label="edit" color="default" onClick={() => handleEditClick(application)}>
                  <BorderColorRoundedIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        );
      })}
      {editApplication && (
        <EditApplicationForm
          open={openEditModal}
          handleClose={handleCloseEditModal}
          application={editApplication}
          handleSubmit={() => handleSubmitEdit(editApplication.id)}
        />
      )}
    </>
  );
};
