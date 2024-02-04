import { Timestamp } from 'firebase/firestore';

export type Running = {
    id: string;
    isPublic: boolean;
    name: string;
    link: string;
    date: {
        start: Timestamp;
        end: Timestamp;
    };
    imageURL: string;
    overview: string;
    mapImageURL: string;
};

export type Place = {
    id: string;
    name: string;
    location: {
        x: number;
        y: number;
    };
    imageURL: string;
};

export type floor = {
    id: string;
    name: string;
    order: number;
};

export type Event = {
    id: string;
    name: string;
    overview: string;
    imageURL: string;
    order: number;
    explanation: string;
    date: {
        start: Timestamp;
        end: Timestamp;
    };
};

export type Form = {
    id: string;
    name: string;
    order: number;
    url: string;
    content: string;
};
