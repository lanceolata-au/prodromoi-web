
import { 
    writable, 
    type Writable 
} from 'svelte/store';

import { 
    member 
} from './model/member';
import { formationSection } from './model/formationSection';

export const storedMember: Writable<member> = writable(new member());
export const hasStoredMember: Writable<boolean> = writable(false);

export const apiLoading: Writable<boolean> = writable(false);


export const checkinFormationSection: Writable<formationSection> = writable(new formationSection());