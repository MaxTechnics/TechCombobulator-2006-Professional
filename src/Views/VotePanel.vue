<template>
    <fieldset>
        <legend>Vote</legend>
        <button v-for="act in voteActions" :key="act.id" @click="handleVoteStart(act)">{{ act.id }}</button>
        <button @click="handleVoteEnd">Send vote end</button>

    </fieldset>
    <ul class="tree-view">
        <li>Voting active: {{ voting_active ? 'Yes' : 'No' }}</li>
        <li>Election active: {{ active_vote?.id || 'None' }}</li>
        <li v-if="active_vote">
            <details open>
                <summary>Tally</summary>
        <li v-for="choice in vote_tally" :key="choice.id">{{ choice.name }} ({{ choice.id }}): {{ choice.tally }}</li>
        <li>Invalid votes: {{ invalid_tally }}</li>
        </details>
        </li>

        <li>Test thingie: {{ computedVoteBracket.map(i => `${i.name} (${i.id})`) }}</li>
    </ul>
</template>

<script setup lang="ts">
import { type RealtimeChannel } from '@supabase/supabase-js';
import { sendVoteAction, sendVoteEnd } from '../lib/vote';
import { type VoteMessage, voteActions, type VoteChoice } from '../actions/vote';
import { ref } from 'vue';
import { computed } from 'vue';
import { executeRundownActions } from '../lib/rundownmgr';

const voting_active = ref(false);
const active_vote = ref<VoteMessage | null>(null);
const vote_tally = ref<{
    [vote_option: string]: {
        name: string;
        id: string;
        tally: number;
    };
}>({});
const invalid_tally = ref(0);

const props = defineProps<{
    realtimeChannel: RealtimeChannel
}>();

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

const handleVoteStart = async (act: VoteMessage) => {
    await sendVoteAction(props.realtimeChannel, act);

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
            tally: 0
        };
    });
}

const handleVoteEnd = () => {
    voting_active.value = false;
    // sendVoteEnd(props.realtimeChannel);
}

// props.realtimeChannel.on('broadcast', { event: 'vote_trigger' }, async ({ payload }: { payload: { action_id: VoteMessage } }) => {
// console.log('VotePanel vote trigger heard', payload)
// });

props.realtimeChannel.on('broadcast', { event: 'vote_submission' }, async ({ payload }: { payload: { choice_id: string } }) => {
    console.log('Vote submission', payload);

    if (!voting_active.value) return console.log('Vote invalid because voting is not active');

    if (vote_tally.value[payload.choice_id]) {
        console.log('Valid vote');
        vote_tally.value[payload.choice_id].tally++;
    } else {
        console.warn('Invalid vote');
        invalid_tally.value++;
    }
});
</script>
