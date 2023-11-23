import {atom} from 'jotai';
import io, {Socket} from 'socket.io-client';

export const socketConnectionAtom = atom<Socket>(
  io('https://football-quiz.onrender.com'),
);
