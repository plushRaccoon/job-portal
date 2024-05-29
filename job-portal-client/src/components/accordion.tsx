import React, { FC, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Box from '@mui/material/Box';
import { Button, Tooltip } from '@mui/material';
import { RenderCandidatesData, RenderCandidatesDetails } from '../utils/renderCandidatesData';
import { RenderPositionsDetails, RenderPositionsData } from '../utils/renderPositionsData';
import { createApplication, fetchAllPositionsOrCandidates } from '../api/requests';
import { ApplyForm } from './application-form';
import { ErrorModal } from './error-modal';

interface Position {
  id: string;
  title: string;
  status: string;
  applications: number;
}

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
}

type Type = 'positions' | 'candidates';

interface AccordionComponentProps {
  type: Type;
  data: Position[] | Candidate[];
  onDelete: (type: Type, id: string) => void;
  onEdit: (type: Type, id: string | undefined, newData) => void;
  onCandidateOrPositionEdit: (type: Type, id: string, newData) => void;
}


export const AccordionComponent: FC<AccordionComponentProps> = ({ type, data, onDelete, onEdit, onCandidateOrPositionEdit }) => {
const [formOpen, setFormOpen] = useState(false);
const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

const handleApplyClick = async (position: Position) => {
  setSelectedPosition(position);
  const entityToFetch = type === 'positions' ? 'candidates' : 'positions';
  const allCandidates = await fetchAllPositionsOrCandidates(entityToFetch);
  setCandidates(allCandidates);
  setFormOpen(true);
};

const handleFormClose = () => {
  setFormOpen(false);
  setSelectedPosition(null);
};

const handleFormSubmit = async (data: { candidate: Candidate | null; cv: string }) => {
  try {
    if (!selectedPosition) return;

    const newApplication = await createApplication(selectedPosition.id, {
      candidateId: data.candidate.id,
      cv: data.cv,
    });

    if (newApplication.statusCode === 400) {
      throw new Error(newApplication.message);
    }

    const application = {
      id: newApplication.id,
      cv: newApplication.cv,
      candidate: data.candidate ? {
        id: data.candidate.id,
        firstName: data.candidate.firstName,
        lastName: data.candidate.lastName,
        email: data.candidate.email,
        phone: data.candidate.phone,
      } : null,
      position: {
        title: selectedPosition.title,
        status: selectedPosition.status,
      },
    };

    const updatedPosition = {
      ...selectedPosition,
      applications: Array.isArray(selectedPosition.applications) ? [...selectedPosition.applications, application] : [application],
    };
    onEdit('positions', selectedPosition.id, updatedPosition);

    const updatedCandidate = {
      ...data.candidate,
      applications: [
        ...(data.candidate.applications || []),
        { id: newApplication.id, cv: newApplication.cv, position: { title: selectedPosition.title, status: selectedPosition.status } },
      ],
    };
    onEdit('candidates', data.candidate.id, updatedCandidate);

    handleFormClose();
  } catch (error) {
    setErrorMessage(error.message);
    setOpenErrorModal(true);
  }
};


return (
  <div data-testid={`${type}-accordion`}>
    {data.map((item) => {
      if (!item) null
      return (
      <Accordion key={item.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${type}-content`}
          id={`${type}-header`}
        >
          <Box display="flex" alignItems="center" width="100%" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              {type === 'positions' ? <RenderPositionsData item={item} /> : <RenderCandidatesData item={item} />}
            </Box>
            {type === 'positions' && (
              <Button
                variant="outlined"
                size="small"
                sx={{ marginRight: 3 }}
                onClick={() => handleApplyClick(item as Position)}
              >
                Apply
              </Button>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            {type === 'positions' ? <RenderPositionsDetails item={item} /> : <RenderCandidatesDetails item={item} onDelete={onDelete} onEdit={onEdit} />}
          </Box>
        </AccordionDetails>
        <AccordionActions>
          <DeleteAndEditButtons type={type} item={item} onDelete={() => onDelete(type, item.id)} onCandidateOrPositionEdit={() => onCandidateOrPositionEdit(type, item, {})} />
        </AccordionActions>
      </Accordion>
        )
    })}
    <ApplyForm
      open={formOpen}
      handleClose={handleFormClose}
      candidates={candidates}
      handleSubmit={(data: { candidate: Candidate | null; cv: string }) => handleFormSubmit(data)}
    />
    <ErrorModal openErrorModal={openErrorModal} handleCloseErrorModal={() => setOpenErrorModal(false)} errorMessage={errorMessage} />
  </div>
);
};

export const DeleteAndEditButtons = ({ type, item, onDelete, onCandidateOrPositionEdit }) => {
  const singularNounType = type.slice(0, -1);
  return (
    <>
      <Tooltip title={`Edit ${singularNounType}`}>
        <IconButton size="large" aria-label="edit" color="default" onClick={() => onCandidateOrPositionEdit(type, item.id, {})}>
          <BorderColorRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Delete ${singularNounType}`}>
        <IconButton size="large" aria-label="delete" color="error" onClick={() => onDelete(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}
