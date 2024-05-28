import { axiosInstance } from "./axios/axios-instance";

export const fetchAllPositionsOrCandidates = async (type) => {
  try {
    const url = type === 'positions' ? '/api/position' : '/api/candidate';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const createPosition = async (title: string) => {
  try {
    const response = await axiosInstance.post('/api/position', { title });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const createCandidate = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/candidate', formData);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const deletePositionOrCandidate = async (type, id) => {
    const url = type === 'positions' ? `/api/position/${id}` : `/api/candidate/${id}`;
    const response = await axiosInstance.delete(url);
    return response;
}

export const updatePositionOrCandidate = async (type, id, newData) => {
  try {
    const url = type === 'positions' ? `/api/position/${id}` : `/api/candidate/${id}`;
    const response = await axiosInstance.patch(url, newData);
    return { applications: newData.applications, ...response.data };
  } catch (error) {
    return error.response.data;
  }
}

export const createApplication = async (positionId, data) => {
  try {
    const response = await axiosInstance.post(`/api/application/${positionId}`, { candidateId: data.candidateId, cv: data.cv });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const deleteApplication = async (applicationId) => {
  const response = await axiosInstance.delete(`/api/application/${applicationId}`);
  return response.data;
}

export const patchApplication = async (applicationId, newData) => {
  const response = await axiosInstance.patch(`/api/application/${applicationId}`, {cv: newData.cv});
  return response.data;
}
