import { useEffect, useState } from 'react';
import '../src/styles/App.css'
import { AccordionComponent } from './components/accordion'
import { SectionHeader } from './components/section-header'
import { deleteApplication, deletePositionOrCandidate, fetchAllPositionsOrCandidates, patchApplication, updatePositionOrCandidate } from './api/requests';
import { ErrorModal } from './components/error-modal';
import { EditPositionForm } from './components/position-form';
import { CreateCandidateForm } from './components/candidate-form';

function App() {

  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [editPosition, setEditPosition] = useState(null);
  const [editCandidate, setEditCandidate] = useState(null);
  const [openEditPositionModal, setOpenEditPositionModal] = useState(false);
  const [openEditCandidateModal, setOpenEditCandidateModal] = useState(false);

  const fetchData = async () => {
    try {
      const fetchedPositions = await fetchAllPositionsOrCandidates('positions');
      const fetchedCandidates = await fetchAllPositionsOrCandidates('candidates');
      
      setPositions(fetchedPositions);
      setCandidates(fetchedCandidates);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setOpenErrorModal(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const addCandidate = (newCandidate) => {
    setCandidates((prevCandidates) => [...prevCandidates, newCandidate]);
  };

  const addPosition = (newPosition) => {
    setPositions((prevPositions) => [...prevPositions, newPosition]);
  }

  const handleDelete = async (type, id) => {
    try {
      if (type === 'applications') {
        await deleteApplication(id);
        await fetchData();
      } else {
        await deletePositionOrCandidate(type, id);
        if (type === 'positions') {
          setPositions((prevPositions) => prevPositions.filter((position) => position.id !== id));
        } else {
          setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.id !== id));
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setOpenErrorModal(true);
    }
  };

  const handleEdit = async (type, id, newData) => {
        if (type === 'applications') {
          await updateApplication(id, newData);
          await fetchData();
        }
        if (type === 'positions') {
          setPositions((prevPositions) =>
            prevPositions.map((position) => (position.id === id ? { ...position, ...newData } : position))
          );
        } else {
          setCandidates((prevCandidates) =>
            prevCandidates.map((candidate) => (candidate.id === id ? { ...candidate, ...newData } : candidate))
          );
        }
      };

  const handleEditClick = async (type, id) => {
    if (type === 'positions') {
      setEditPosition(id);
      setOpenEditPositionModal(true);
    } else {
      setEditCandidate(id);
      setOpenEditCandidateModal(true);
    }
  };

  const updatePosition = async (id, updatedData) => {
    try {
      const updatedPosition = await updatePositionOrCandidate('positions', id, updatedData);

      if (updatedPosition.statusCode) {
        throw new Error(updatedPosition.message);
      }

      setPositions((prevPositions) => prevPositions.map((position) => (position.id === id ? updatedPosition : position)));
      setOpenEditPositionModal(false);
      setEditPosition(null);

      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.applications.some((app) => app.position.id === id)
            ? { ...candidate, applications: candidate.applications.map((app) => app.position.id === id ? { ...app, position: updatedPosition } : app) }
            : candidate
        )
      );

    } catch (error) {
      setErrorMessage(error.message);
      setOpenErrorModal(true);
    }
  };

  const updateCandidate = async (id, updatedData) => {
    const updatedCandidate = await updatePositionOrCandidate('candidates', id, updatedData);
    if (updatedCandidate.statusCode) {
      throw new Error(updatedCandidate.message);
    }
      setCandidates((prevCandidates) => prevCandidates.map((candidate) => (candidate.id === id ? updatedCandidate : candidate)));
      setOpenEditCandidateModal(false);
      setEditCandidate(null);

      setPositions((prevPositions) =>
        prevPositions.map((position) =>
          position.applications.some((app) => app.candidate.id === id)
            ? { ...position, applications: position.applications.map((app) => app.candidate.id === id ? { ...app, candidate: updatedCandidate } : app) }
            : position
        )
      );
  };

  const updateApplication = async (id, updatedData) => {
    try {
      const updatedApplication = await patchApplication(id, updatedData);
      if (updatedApplication.statusCode) {
        throw new Error(updatedApplication.message);
      }
      await fetchData();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setOpenErrorModal(true);
    }
  };


  return (
    <>
      <section className="positions">
        <SectionHeader name="positions"  addPosition={addPosition} />
        <AccordionComponent type="positions" data={positions} onDelete={handleDelete} onEdit={handleEdit} onCandidateOrPositionEdit={handleEditClick} />
      </section>
      <section className="candidates">
        <SectionHeader name="candidates" addCandidate={addCandidate} />
        <AccordionComponent type="candidates" data={candidates} onDelete={handleDelete} onEdit={handleEdit} onCandidateOrPositionEdit={handleEditClick} />
      </section>
      <ErrorModal openErrorModal={openErrorModal} handleCloseErrorModal={handleCloseErrorModal} errorMessage={errorMessage} />
      <EditPositionForm open={openEditPositionModal} handleClose={() => setOpenEditPositionModal(false)} position={editPosition} updatePosition={updatePosition} />
      <CreateCandidateForm open={openEditCandidateModal} handleClose={() => setOpenEditCandidateModal(false)} candidate={editCandidate} updateCandidate={updateCandidate} addCandidate={undefined} />
    </>
  )
}

export default App
