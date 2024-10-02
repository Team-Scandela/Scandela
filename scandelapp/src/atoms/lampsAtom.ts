import { atom } from 'jotai';

// Atome pour stocker la liste des lampes
export const lampsAtom = atom<any[]>([]);

// Atome pour indiquer si les lampes sont en train de se charger
export const isLoadingAtom = atom<boolean>(true);

// Atome pour l'état de l'erreur lors du chargement des lampes
export const errorAtom = atom<string | null>(null);
