<template>
    <fieldset>
        <legend>Vote</legend>
        <Fragment v-if="debug">
            <button v-for="act in voteActions" :key="act.id" @click="handleVoteStart(act)">{{ act.id }}</button>
            <button @click="handleVoteEnd()">Stop Vote</button>
            <!-- <button @click="handleVoteEnd(true)">Cancel Vote</button> -->
        </Fragment>

        <ul class="tree-view">
            <li>Voting active: {{ voteStore.voting_active ? 'Yes' : 'No' }}</li>
            <li>Election active: {{ voteStore.active_vote?.id || 'None' }}</li>
            <li v-if="voteStore.active_vote">
                <details open>
                    <summary>Tally</summary>
            <li v-for="choice in voteStore.vote_tally" :key="choice.id">{{ choice.name }} ({{ choice.id }}): {{ choice.tally }}</li>
            <li>Invalid votes: {{ voteStore.invalid_tally }}</li>
            </details>
            </li>

            <li>Test thingie: {{ voteStore.computedVoteBracket.map(i => `${i.name} (${i.id})`) }}</li>
            <li>Latest results: {{ voteStore.computedVoteBracket.map(i => `${i.name} (${i.id})`) }}</li>
        </ul>
    </fieldset>
</template>

<script setup lang="ts">
import { type RealtimeChannel } from '@supabase/supabase-js';
import { useVoteStore } from '../stores/vote';
import Fragment from '../components/Fragment.vue';
import { sendVoteAction, sendVoteEnd } from '../lib/vote';
import { type VoteMessage, voteActions } from '../actions/vote';

const voteStore = useVoteStore();

const props = defineProps<{
    realtimeChannel: RealtimeChannel,
    debug?: boolean;
}>();

const handleVoteStart = (action: VoteMessage) => {
    sendVoteAction(props.realtimeChannel, action)
}

const handleVoteEnd = () => {
    sendVoteEnd(props.realtimeChannel);
}

props.realtimeChannel.on('broadcast', { event: 'vote_submission' }, async ({ payload }: { payload: { choice_id: string } }) => {
    console.log('Vote submission', payload);

    if (!voteStore.voting_active) return console.log('Vote invalid because voting is not active');

    if (voteStore.vote_tally[payload.choice_id]) {
        console.log('Valid vote');
        voteStore.vote_tally[payload.choice_id].tally++;
    } else {
        console.warn('Invalid vote');
        voteStore.invalid_tally++;
    }
});
</script>

<style lang="scss" scoped>
fieldset {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

ul {
    width: 100%;
}
</style>
