import { type RealtimeChannel } from "@supabase/supabase-js";
import { type BackstageCasparAction } from "../actions/rundown";


export const sendBlinkenLightAction = async (sbChannel: RealtimeChannel, id: string) => {
    console.log('Sending blinken light action:', id);
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'blinken_action_light',
        payload: {
            action_id: id
        }
    });

    console.log('Response from sending blinken light action:', resp);
};

export const sendBlinkenVideoAction = async (sbChannel: RealtimeChannel, act: BackstageCasparAction) => {
    console.log('Sending blinken video action:', act);
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'blinken_action_video',
        payload: {
            action: act
        }
    });

    console.log('Response from sending blinken video action:', resp);
};
