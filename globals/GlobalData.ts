import {atom} from 'jotai';
import io, {Socket} from 'socket.io-client';
import {TypeQuestion} from '../Type/TypeQuestion';
import {TypeTemporartyAnswer} from '../Type/TypeTemporaryAnswer';

export const socketConnectionAtom = atom<Socket>(
  io('https://football-quiz.onrender.com'),
);

export const playerQuiz = atom<any>([]);

export const timerQuiz = atom<number>(0);

export const roomId = atom<string>('');

export const questions = atom<TypeQuestion[]>([]);

export const options = atom<{} | null>({});

export const temporaryAnswer = atom<TypeTemporartyAnswer[]>([]);

export const questionIndex = atom<number>(0);
