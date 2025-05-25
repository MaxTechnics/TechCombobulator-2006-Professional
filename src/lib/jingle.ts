import { type RealtimeChannel } from "@supabase/supabase-js";


export const sendJingleAction = async (sbChannel: RealtimeChannel, id: string) => {
    console.log('Sending jingle action:', id);
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'jingle_action',
        payload: { action_id: id }
    });

    console.log('Response from sending jingle action:', resp);
};
