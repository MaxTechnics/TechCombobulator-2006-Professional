import { RealtimeChannel } from '@supabase/supabase-js';
import { getRundownAction } from '../actions/rundown';
import { sendJingleAction } from './jingle';

const rundownWaitAction = (durationString: string) => new Promise<void>((resolve) => setInterval(resolve, parseInt(durationString)));

export const executeRundownActions = async (rtChannel: RealtimeChannel, rundonwAction_id: string) => {
    const action = getRundownAction(rundonwAction_id);
    if (!action) {
        console.error(`Rundown action with id ${rundonwAction_id} not found`);
        return;
    }

    console.log(`Executing rundown action: ${action.name}`);
    // Every action needs to be awaited before the next action can start
    for (const subAction of action.actions) {
        switch (subAction.type) {
            case 'jingle_trigger':
                console.log(`Triggering jingle: ${subAction.id}`);
                // Here you would call the function to trigger the jingle
                await sendJingleAction(rtChannel, subAction.id)
                break;
            case 'wait':
                console.log(`Waiting for ${subAction.id} milliseconds`);
                await rundownWaitAction(subAction.id);
                break;
            default:
                console.error(`Unknown action type: ${subAction.type}`);
        }
    }
};


// brb again, sorryy
