import { type RealtimeChannel } from "@supabase/supabase-js";
import { type VoteMessage } from "../actions/vote";

export const sendVoteAction = async (sbChannel: RealtimeChannel, vote_action: VoteMessage) => {
    console.log('Sending vote action:', vote_action);
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'vote_trigger',
        payload: { vote_action }
    });

    console.log('Response from sending vote action:', resp);
};

export const sendVoteEnd = async (sbChannel: RealtimeChannel) => {
    console.log('Sending vote end');
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'vote_end'
    });

    console.log('Response from sending vote end:', resp);
}
