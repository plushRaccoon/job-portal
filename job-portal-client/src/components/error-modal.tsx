import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { StyleForModals } from "../utils/constants";
import { FC } from "react";

type ErrorModalContentProps = {
  openErrorModal: boolean;
  handleCloseErrorModal: () => void;
  errorMessage: string;
};

export const ErrorModal: FC<ErrorModalContentProps> = ({ openErrorModal, handleCloseErrorModal, errorMessage }) => (
  <Modal
          open={openErrorModal}
          onClose={handleCloseErrorModal}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box sx={StyleForModals}>
            <Typography id="error-modal-title" variant="h6" component="h2">
              Oops! Something went wrong.
            </Typography>
            <Typography id="error-modal-description" variant="body1">
              {errorMessage ?? 'An error occurred. Please try again later.'}
            </Typography>
          </Box>
      </Modal>
);
