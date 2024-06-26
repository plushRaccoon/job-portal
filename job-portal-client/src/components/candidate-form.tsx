import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createCandidate } from "../api/requests";
import { StyleForModals } from "../utils/constants";
import { ErrorModal } from "./error-modal";
import CloseIcon from '@mui/icons-material/Close';

const CreateCandidateForm = ({ open, handleClose, addCandidate, candidate, updateCandidate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [handleChangeCalled, setHandleChangeCalled] = useState(false);

  useEffect(() => {
    if (candidate) {
      setFormData({
        firstName: candidate.firstName || '',
        lastName: candidate.lastName || '',
        email: candidate.email || '',
        phone: candidate.phone || '',
      });
    }
  }, [candidate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...candidate, ...prevData, [name]: value }));
    setHandleChangeCalled(true);
  };

  const handleSubmit = async () => {
    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        throw new Error('All fields are required');
      }

      if (candidate) {

        if (handleChangeCalled) {
          await updateCandidate(candidate.id, formData);
          
          setHandleChangeCalled(false);
        }

        handleClose();
      } else {
        const newCandidate = await createCandidate(formData);

        if (newCandidate.statusCode && newCandidate.statusCode !== 201) {
          throw new Error(newCandidate.message);
        }

        if (addCandidate) {
          addCandidate(newCandidate);
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
        });
        handleClose();
      }
    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-candidate-form-title"
        aria-describedby="create-candidate-form-description"
      >
        <Box sx={StyleForModals}>
          <Typography id="create-candidate-form-title" variant="h6" component="h2">
            {candidate ? 'Edit Candidate' : 'Create Candidate'}
          </Typography>
          <IconButton data-testid='close-icon' onClick={handleClose} sx={{ position: 'absolute', right: 0, top: 0 }}>
            <CloseIcon />
          </IconButton>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            {candidate ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Modal>
      <ErrorModal openErrorModal={openErrorModal} handleCloseErrorModal={handleCloseErrorModal} errorMessage={errorMessage} />
    </>
  );
};

export { CreateCandidateForm };
