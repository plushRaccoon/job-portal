import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { createPosition } from "../api/requests";
import { StyleForModals } from "../utils/constants";
import { ErrorModal } from "./error-modal";

export const CreatePositionForm = ({ open, handleClose, addPosition }) => {
  const [title, setTitle] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async () => {
    try {
      const newPosition = await createPosition(title);
      if (newPosition?.statusCode === 201|| newPosition?.status === 201) {
        addPosition(newPosition.data);
        setTitle('');
        handleClose();
      } else {
        throw new Error(newPosition?.message);
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
        aria-labelledby="create-position-form-title"
        aria-describedby="create-position-form-description"
      >
        <Box sx={StyleForModals}>
          <Typography id="create-position-form-title" variant="h6" component="h2">
            Create Position
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Create
          </Button>
        </Box>
      </Modal>
      <ErrorModal openErrorModal={openErrorModal} handleCloseErrorModal={handleCloseErrorModal} errorMessage={errorMessage} />
    </>
  )
};

export const EditPositionForm = ({ open, handleClose, position, updatePosition }) => {
  const [formData, setFormData] = useState({
    title: '',
    status: '',
  });
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (position) {
      setFormData({
        title: position.title || '',
        status: position.status || '',
      });
    }
  }, [position]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return ({ ...position, ...prevData, [name]: value })
    });
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      return ({ ...position, ...prevData, status: value })
    });
  };

  const handleSubmit = async () => {
    try {
      await updatePosition(position.id, formData);
      handleClose();
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
        aria-labelledby="edit-position-form-title"
        aria-describedby="edit-position-form-description"
      >
        <Box sx={StyleForModals}>
          <Typography id="edit-position-form-title" variant="h6" component="h2">
            Edit Position
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="candidate-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={formData.status}
              onChange={handleStatusChange}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
            Update
          </Button>
        </Box>
      </Modal>
      <ErrorModal openErrorModal={openErrorModal} handleCloseErrorModal={handleCloseErrorModal} errorMessage={errorMessage} />
    </>
  );
};
