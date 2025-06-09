import { RealtimeChannel } from '@supabase/supabase-js';
import { getRundownAction } from '../actions/rundown';
import { sendJingleAction } from './jingle';
import { sendBlinkenLightAction, sendBlinkenVideoAction } from './blinkenlightz';
import { sendVoteAction, sendVoteEnd } from './vote';
import { voteActions } from '../actions/vote';

const rundownWaitAction = (durationString: string) => new Promise<void>((resolve) => setInterval(resolve, parseInt(durationString)));

export const executeRundownActions = async (rtChannel: RealtimeChannel, rundonwAction_id: string) => {
    const action = getRundownAction(rundonwAction_id);
    if (!action) {
        console.error(`Rundown action with id ${rundonwAction_id} not found`);
        return;
    }

    console.log(`Executing rundown action: ${action.name}`);
    // Every action needs to be awaited before the next action can start
    if (action.type === 'dynamic') return console.error('Tried to execute a dynamic action, big shit!')
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
            case 'blinken_light':
                console.log(`Blinken light action: ${subAction.id}`);
                // Here you would call the function to handle the blinken light action
                // await handleBlinkenLightAction(subAction.id);
                await sendBlinkenLightAction(rtChannel, subAction.id);
                break;
            case 'blinken_video':
                console.log(`Blinken video action: ${subAction}`);
                // Here you would call the function to handle the blinken video action
                // await handleBlinkenVideoAction(subAction.id);
                await sendBlinkenVideoAction(rtChannel, subAction);
                break;
            case 'vote_trigger':
                await sendVoteAction(rtChannel, voteActions[subAction.id])
                break;
            case 'vote_end':
                await sendVoteEnd(rtChannel);
                break;
            default:
                console.error(`Unknown action type: ${subAction}`);
        }
    }
};


// brb again, sorryy
