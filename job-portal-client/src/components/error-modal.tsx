import { Box, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { StyleForModals } from "../utils/constants";
import React, { FC, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

type ErrorModalContentProps = {
  openErrorModal: boolean;
  handleCloseErrorModal: () => void;
  errorMessage: string;
};

export const ErrorModal: FC<ErrorModalContentProps> = ({ openErrorModal, handleCloseErrorModal, errorMessage }) => {
  useEffect(() => {
    if (openErrorModal) {
      const timer = setTimeout(() => {
        handleCloseErrorModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [openErrorModal, handleCloseErrorModal]);
  
  return (
  <Modal
          open={openErrorModal}
          onClose={handleCloseErrorModal}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box sx={StyleForModals}>
            <Typography id="error-modal-title" data-testid = "error-modal-title" variant="h6" component="h2">
              Oops! Something went wrong.
            </Typography>
            <IconButton data-testid='close-icon' onClick={handleCloseErrorModal} sx={{ position: 'absolute', right: 0, top: 0 }}>
              <CloseIcon />
            </IconButton>
            <Typography id="error-modal-description" variant="body1">
              {errorMessage ?? 'An error occurred. Please try again later.'}
            </Typography>
          </Box>
      </Modal>
)};
