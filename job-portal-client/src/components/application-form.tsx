import React, { FC, useEffect, useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Modal, Typography } from '@mui/material';
import { StyleForModals } from '../utils/constants';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
}

interface ApplyFormProps {
  open: boolean;
  handleClose: () => void;
  candidates: Candidate[];
  handleSubmit: (data: { candidate: Candidate | null; cv: string }) => void;
}

export const ApplyForm: FC<ApplyFormProps> = ({ open, candidates, handleSubmit, handleClose }) => {
  const [formData, setFormData] = useState({
    candidate: null,
    cv: '',
  });

  const handleCandidateChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const candidateId = event.target.value as string;
    const selectedCandidate = candidates.find(candidate => candidate.id === candidateId);
    setFormData(prevFormData => ({
      ...prevFormData,
      candidate: selectedCandidate,
    }));
  };

  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cv = event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      cv: cv,
    }));
  };

  const handleCloseForm = () => {
    setFormData({
      candidate: null,
      cv: '',
    });
    handleClose();
  };

  const handleFormSubmit = () => {
    handleSubmit(formData);
    setFormData({
      candidate: null,
      cv: '',
    });
  };

  return (
      <Modal
        open={open}
        onClose={handleCloseForm}
        aria-labelledby="create-application-form-title"
        aria-describedby="create-application-form-description"
      >
        <Box sx={StyleForModals}>
          <Typography id="create-application-form-title" variant="h6" component="h2">
            Apply to the position
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="candidate-label">Candidate</InputLabel>
            <Select
              labelId="candidate-label"
              value={formData.candidate ? formData.candidate.id : ''}
              onChange={handleCandidateChange}
            >
              {candidates.map((candidate) => (
                <MenuItem key={candidate.id} value={candidate.id}>
                  {candidate.firstName} {candidate.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="CV"
            multiline
            rows={4}
            value={formData.cv}
            onChange={handleCvChange}
          />
          <Button  onClick={handleFormSubmit} variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Modal>
  );
};

interface EditApplicationFormProps {
  open: boolean;
  handleClose: () => void;
  application: { id: string, cv: string };
  handleSubmit: (id: string, data: { cv: string }) => void;
}

const EditApplicationForm: FC<EditApplicationFormProps> = ({ open, handleClose, application, handleSubmit }) => {
  const [cv, setCv] = useState('');

  useEffect(() => {
    if (application) {
      setCv(application.cv);
    }
  }, [application]);

  const handleCvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    application.cv = event.target.value;
    setCv(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(application.id, cv);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setCv('');
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseForm}
      aria-labelledby="edit-application-form-title"
      aria-describedby="edit-application-form-description"
    >
      <Box sx={StyleForModals}>
        <Typography id="edit-application-form-title" variant="h6" component="h2">
          Edit Application
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="CV"
          multiline
          rows={4}
          value={cv}
          onChange={handleCvChange}
        />
        <Button onClick={handleFormSubmit} variant="contained" color="primary" fullWidth size='large'>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditApplicationForm;
