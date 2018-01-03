import { POP_UP_CHANGED } from '../types';

export const WhichPopUp = btnNo => ({
    type: POP_UP_CHANGED,
    payload: btnNo,
});
