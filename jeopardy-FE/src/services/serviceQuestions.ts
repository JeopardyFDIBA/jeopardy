import { IQuestion } from '../sharedInterfaces';
import apiInstance from './axiosConfig';

export const getOpening = async () : Promise<IQuestion> => {
  try {
    const response = await apiInstance.get('/opening');
    return {
      score: response.data.score,
      question: response.data.actualQuestion,
      id: response.data.id,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface CheckAnswerResponse {
  correct: boolean;
  correctAnswer: string;
}
export const checkAnswer = async (
  id: number | undefined,
  answer: string,
): Promise<CheckAnswerResponse> => {
  const response = await apiInstance.post('/checkAnswer', { id, answer });
  return response.data;
};
