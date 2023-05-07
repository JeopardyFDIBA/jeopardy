import apiInstance from './axiosConfig';

export const getPlayers = async () => {
  try {
    const response = await apiInstance.get('/players');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const savePlayers = async (allPlayers: string[]) => {
  try {
    const response = await apiInstance.post('/saveUsers', JSON.stringify(allPlayers));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateScore = async (id: number | undefined, score: number | undefined) => {
  try {
    const response = await apiInstance.post('/updatescore', { id, score });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
