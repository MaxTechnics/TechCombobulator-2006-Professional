import { type RealtimeChannel } from "@supabase/supabase-js";
import { type VoteMessage } from "../actions/vote";
import { useVoteStore } from "../stores/vote";


export const sendVoteAction = async (sbChannel: RealtimeChannel, vote_action: VoteMessage) => {
    const votestore = useVoteStore();
    console.log('Sending vote action:', vote_action);
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'vote_trigger',
        payload: { vote_action }
    });

    votestore.handleVoteStartStore(vote_action);

    console.log('Response from sending vote action:', resp);
};

export const sendVoteEnd = async (sbChannel: RealtimeChannel) => {
    const votestore = useVoteStore();
    console.log('Sending vote end');
    const resp = await sbChannel.send({
        type: 'broadcast',
        event: 'vote_end'
    });

    votestore.handleVoteEndStore();

    console.log('Response from sending vote end:', resp);
}
