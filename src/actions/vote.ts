import type * as lucideicon from 'lucide-vue-next';

export type VoteChoice = {
    name: string;
    icon: keyof typeof lucideicon;
    id: string;
    action?: string; // action to execute i guess.
    rundownitems?: string[]; // rundown item id's
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
    },
    'program_chooser': {
        id: 'program_chooser',
        title: 'Choose program',
        choice: [
            {
                name: 'Ter zake',
                icon: 'Type',
                id: 'pg_chooser_ter_zake',
                action: 'do_terzake'
            },
            {
                name: 'De afspraak',
                icon: 'CalendarCheck',
                id: 'pg_chooser_de_afspraak',
                action: 'do_daf'
            },
            {
                name: 'De zevende dag',
                icon: 'Donut',
                id: 'pg_chooser_de_zevende_dag',
                action: 'do_d7d'
            },
            {
                name: 'Journaal',
                icon: 'Newspaper',
                id: 'pg_chooser_journaal',
                action: 'do_journaal'
            }
        ],
        votes: 2
    },
    'brb': {
        id: 'brb',
        title: 'I\'ll be right back\nenjoy the blobs',
        choice: [],
        votes: -1
    },
    jn_mxm_bp_items: {
        id: 'jn_mxm_bp_items',
        title: 'Kies 2 items',
        choice: [
            {
                name: 'Evacuaties Keulen',
                icon: 'Bomb',
                id: 'jn_mxm_bp_keulen',
                // action: ''
                rundownitems: [
                    'bp_fullrun_keulen_ident',
                    'bp_fullrun_keulen_start',
                    'bp_fullrun_keulen_repo'
                ]
            },
            {
                name: 'Starttoetsen leraren',
                icon: 'ClipboardX',
                id: 'jn_mxm_bp_starttoetsen',
                rundownitems: [
                    'bp_fullrun_startexamen_ident',
                    'bp_fullrun_startexamen_start',
                    'bp_fullrun_startexamen_repo'
                ]
            },
            {
                name: 'Opleiding Luchtvaart',
                icon: 'Plane',
                id: 'jn_mxm_bp_opleiding_atc',
                rundownitems: [
                    'bp_fullrun_atc_ident',
                    'bp_fullrun_atc_start',
                    'bp_fullrun_atc_repo'
                ]
            },
            {
                name: 'Maatregelen maaidood',
                icon: 'PawPrint',
                id: 'jn_mxm_bp_maaidood',
                rundownitems: [
                    'bp_fullrun_ree_ident',
                    'bp_fullrun_ree_start',
                    'bp_fullrun_ree_repo'
                ]
            }
        ],
        votes: 2
    }
}
