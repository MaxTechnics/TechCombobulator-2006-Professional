import type * as lucideicon from 'lucide-vue-next';

export type VoteChoice = {
    name: string;
    icon: keyof typeof lucideicon;
    id: string;
}

export interface VoteMessage {
    id: string;
    title: string;
    choice: VoteChoice[]
    votes: number; // if -1, infinite/mash voting
}

export const voteActions: { [action_id: string]: VoteMessage } = {
    'test_vote': {
        id: 'test_vote',
        title: 'Your vote counts xD',
        choice: [
            {
                name: 'Choice 1',
                icon: 'Check',
                id: 'choice_1'
            },
            {
                name: 'Choice 2',
                icon: 'X',
                id: 'choice_2'
            },
            {
                name: 'Choice 3',
                icon: 'Heart',
                id: 'choice_3'
            }
        ],
        votes: -1
    }
}
