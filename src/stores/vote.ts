import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { type VoteMessage } from '../actions/vote';

export const useVoteStore = defineStore('vote', () => {
    // probably vote results sorted so rundown can action upon it
    // latest results array todo
    interface VoteResult {
        name: string;
        id: string;
        rundownitems?: string[]; // rundown item id's
        tally: number;
    }

    const latest_results = ref<VoteResult[]>([]);

    const voting_active = ref(false);
    const active_vote = ref<VoteMessage | null>(null);
    const vote_tally = ref<{
        [vote_option: string]: VoteResult
    }>({});
    const invalid_tally = ref(0);

    const computedVoteBracket = computed(() => {
        // last year's logic: const winningVote = Object.entries(state.voteCount).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        if (!active_vote.value) return [];

        return active_vote.value.choice
            .map(choice => {
                const tallyData = vote_tally.value[choice.id] || { tally: 0 };
                return {
                    ...choice,
                    tally: tallyData.tally
                };
            })
            .sort((a, b) => b.tally - a.tally);
    })

    const handleVoteStartStore = async (act: VoteMessage) => {
        // await sendVoteAction(props.realtimeChannel, act);

        // we clear any previous state before starting the new
        active_vote.value = null;
        vote_tally.value = {};
        invalid_tally.value = 0;

        voting_active.value = true;
        active_vote.value = act;

        act.choice.forEach(choice => {
            vote_tally.value[choice.id] = {
                name: choice.name,
                id: choice.id,
                rundownitems: choice.rundownitems || [],
                tally: 0
            };
        });
    }

    const handleVoteEndStore = (cancel?: boolean) => {
        voting_active.value = false;
        latest_results.value = computedVoteBracket.value;
        // sendVoteEnd(props.realtimeChannel);

        // NOTE: this is not being executed right now as we give full control to the rundown
        // if (computedVoteBracket.value[0].action && computedVoteBracket.value[0].tally !== 0 && !cancel) executeRundownActions(props.realtimeChannel, computedVoteBracket.value[0].action);
    }


    return {
        voting_active,
        active_vote,
        vote_tally,
        invalid_tally,
        computedVoteBracket,
        handleVoteStartStore,
        handleVoteEndStore
    }
})
