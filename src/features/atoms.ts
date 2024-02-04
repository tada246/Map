import { atom } from 'jotai';
import { Running } from '../types/firebase';

export const eventInfo = atom<{
    data: Running | undefined;
    isLoading: boolean;
    error: any;
}>({ isLoading: true, data: undefined, error: undefined });
