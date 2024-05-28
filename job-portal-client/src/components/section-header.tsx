import Button from "@mui/material/Button";
import React, { FC } from "react";
import '../styles/section-header.css';
import { CreateCandidateForm } from "./candidate-form";
import { CreatePositionForm } from "./position-form";

interface SectionHeaderProps {
  name: string
  addCandidate?: (candidate) => void;
  addPosition?: (position) => void;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ name, addCandidate, addPosition }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <header className={name}>
      <h2>{name.toUpperCase()}</h2>
      <div>
      <Button onClick={handleOpen} variant="outlined" size="large">
        Create new
      </Button>
        {
          name === 'positions'
            ? (<CreatePositionForm handleClose={handleClose} open={open} addPosition={addPosition} />)
            : (<CreateCandidateForm handleClose={handleClose} open={open} addCandidate={addCandidate} candidate={undefined} updateCandidate={undefined} />)
        }
    </div>
    </header>
  );
};
