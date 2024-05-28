// import React, { useState } from 'react';
// import { List, ListItem, IconButton, ListItemText, Box, ListItemIcon, TextField, Button, Modal } from "@mui/material";
// import Divider from "@mui/material/Divider";
// import DeleteIcon from '@mui/icons-material/Delete';
// import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
// import { StyleForModals } from './constants';
// import EditApplicationForm from '../components/application-form';

// export const RenderCandidatesData = ({ item }) => (
//   <>
//     {item.firstName} {item.lastName}
//     <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
//     {item.email}
//     <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
//     {item.phone}
//   </>
// )

// export const RenderCandidatesDetails = ({ item, onDelete, onEdit }) => {
//   // const [editedCV, setEditedCV] = useState('');
//   // const [openModal, setOpenModal] = useState(false);
//   // const [ applicationId, setApplicationId ] = useState('');
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editApplication, setEditApplication] = useState(null);

//   // const handleEditClick = (id, cv) => {
//   //   setOpenModal(true);
//   //   setApplicationId(id);
//   //   setEditedCV(cv);
//   // };

//   // const handleCancelEdit = () => {
//   //   setOpenModal(false);
//   //   setEditedCV('');
//   // };

//   // const handleSubmitEdit = (editedCV) => {
//   //   onEdit('applications', applicationId, editedCV);
//   //   setOpenModal(false);
//   //   setEditedCV('');
//   // };

//   const handleEditClick = (application) => {
//     setEditApplication(application);
//     setOpenEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setOpenEditModal(false);
//     setEditApplication(null);
//   };

//   const handleSubmitEdit = (id, editedData) => {
//     onEdit('applications', id, editedData);
//     setOpenEditModal(false);
//     setEditApplication(null);
//   };

//   return (
//     <>
//       {item.applications?.map((application) => {
//         const { id, cv, position: { title, status } } = application;
//         return (
//           <List key={id}>
//             <ListItem secondaryAction={
//               <IconButton edge="end" aria-label="delete" color='error' onClick={() => onDelete('applications', id)}>
//                 <DeleteIcon />
//               </IconButton>
//             }>
//               <ListItemText sx={{ marginRight: 10 }}>
//                 <Box key={id}>
//                   <Box display="flex" alignItems="center" marginBottom="10px">
//                     {title}
//                     <Divider orientation="vertical" flexItem style={{ margin: '0 8px' }} />
//                     {status}
//                   </Box>
//                   {cv}
//                 </Box>
//               </ListItemText>
//               <ListItemIcon>
//                   {/* <IconButton size="large" aria-label="edit" color="default" onClick={() => handleEditClick(id, cv)}> */}
//                   <IconButton size="large" aria-label="edit" color="default" onClick={() => handleEditClick(application)}>
//                     <BorderColorRoundedIcon />
//                   </IconButton>
//               </ListItemIcon>
//             </ListItem>
//           </List>
//         );
//       })}
//       {editApplication && (
//         <EditApplicationForm
//           open={openEditModal}
//           handleClose={handleCloseEditModal}
//           application={editApplication}
//           handleSubmit={handleSubmitEdit}
//         />
//       )}
//       {/* <Modal
//         open={openModal}
//         onClose={handleCancelEdit}
//         aria-labelledby="edit-cv-form-title"
//         aria-describedby="edit-cv-form-description"
//       >
//         <Box sx={StyleForModals}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             multiline
//             id="cv"
//             label="CV"
//             name="cv"
//             value={editedCV}
//             onChange={(e) => setEditedCV(e.target.value)}
//           />
//           <Button onClick={() => handleSubmitEdit(editedCV)} variant="contained" color="primary" fullWidth size='large'>
//             Submit
//           </Button>
//         </Box>
//       </Modal> */}
//     </>
//   );
// };


import { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import EditApplicationForm from '../components/application-form'; // Ensure the import is correct

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
