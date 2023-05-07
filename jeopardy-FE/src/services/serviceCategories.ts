import { IQuestion } from '../sharedInterfaces';
import apiInstance from './axiosConfig';

export const getCategories = async () => {
  try {
    const response = await apiInstance.get('/category');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getQuestionsByCategory = async (category: string) : Promise<IQuestion[]> => {
  try {
    const response = await apiInstance.get(`/question/${category}`);
    const updatedResponse = response.data.map((
      { id, actualQuestion, score } : { id: number, actualQuestion: string, score: number },
    ) => ({ id, question: actualQuestion, score }));
    return updatedResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
