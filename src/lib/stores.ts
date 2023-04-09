
import { 
    writable, 
    type Writable 
} from 'svelte/store';

import { 
    member 
} from './model/member';

export const storedMember: Writable<member> = writable(new member())
export const hasStoredMember: Writable<boolean> = writable(false)

export const apiLoading: Writable<boolean> = writable(false)
