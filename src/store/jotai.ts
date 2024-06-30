// jotai で状態を管理するための store を作成
import { atom } from 'jotai';
import { Notice } from '../types/firebase';

export const message_atom = atom<Notice[]>([]);
