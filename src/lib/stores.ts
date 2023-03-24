
import { 
    writable, 
    type Writable 
} from 'svelte/store';

import { 
    member 
} from './model/member';

export const storedMember: Writable<member> = writable(new member())

