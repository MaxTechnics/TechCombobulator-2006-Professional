import { useVoteStore } from "../stores/vote";

export type BackstageOtherAction = {
    type: 'jingle_trigger' | 'blinken_light' | 'wait';
    id: string;
}

export type BackstageCasparAction = {
    type: 'blinken_video';
    cmd: 'play' | 'load' | 'clear';
    channel: number;
    layer: number;
    clip?: string;
    transition?: boolean;
}

export type BackstageVoteAction = {
    type: 'vote_trigger';
    id: string;
}

export type BackstageVoteEndAction = {
    type: 'vote_end';
}

export type BackstageAction = BackstageCasparAction | BackstageVoteAction | BackstageVoteEndAction | BackstageOtherAction;


// TODO: it's possible that i'm going to need a combiner module for this to execute some actions simultaneously

export type DynamicRundownAction = {
    type: 'dynamic';
    id: string;
    name: string;
    description?: string;
    // actions: BackstageAction[];
    voteidx: number;
    fallbackrundownitems: string[]; // If no vote results use fallback items
} // this is never to be directly executed but rather used to determine a static action


export type RundownAction = {
    type: 'static';
    id: string;
    name: string;
    description?: string;
    actions: BackstageAction[];
} | DynamicRundownAction

export const rundownActions: { [action_id: string]: RundownAction } = {
    'bp_load': {
        type: 'static',
        id: 'bp_load',
        name: 'BP Load',
        description: 'Prepares all systems for show start',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 4
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 5
            },
            {
                type: 'blinken_video',
                cmd: 'load',
                channel: 1,
                layer: 8,
                clip: 'preintro'
            },
            {
                type: 'blinken_video',
                cmd: 'load',
                channel: 1,
                layer: 1,
                clip: 'studiobg'
            },
            {
                type: 'wait',
                id: '2000'
            },
            {
                type: 'blinken_video',
                cmd: 'load',
                channel: 1,
                layer: 4,
                clip: 'IntroMxmEdit03_v3'
            }
            // {
            //     type: 'blinken_video',
            //     cmd: 'load',
            //     channel: 1,
            //     layer: 2,
            //     clip: 'studiobg' // for intro transiitons
            // }
            // set light to correct
        ]
    },
    'bp_clock': {
        type: 'static',
        id: 'bp_clock',
        name: 'BP Clock',
        description: 'Starts the idle clock',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 8,
                // clip: 'preintro'
            },
            {
                type: 'wait',
                id: '2750'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_mxm_counter'
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 8
            },
            {
                type: 'blinken_light',
                id: 'clockidle'
            }
        ]
    },
    'bp_start': {
        type: 'static',
        id: 'bp_start',
        name: 'BP Start',
        description: 'Starts journaal (welcome message, interactive explainer, prep)',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_mxm_start'
            },
            {
                type: 'blinken_light',
                id: 'l_jnstart'
            },
            {
                type: 'blinken_video',
                // id: 'uitsmijteralpha'
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'IntroMxmEdit03_v3'
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 5,
                clip: 'kies_qr_v2'
            }
            // Do light
        ]
    },
    'bp_hl1': {
        type: 'static',
        id: 'bp_hl1',
        name: 'BP Headline 1',
        description: 'Headline 1 Donderen in keulen || DOORLEZER',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_mxm_hl1'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Intro/IntroKeulen_v2',
                transition: true
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Title/Headline_KEULEN_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            },
            // hl video
            // maybe light?? probably not
        ]
    },
    'bp_hl2': {
        type: 'static',
        id: 'bp_hl2',
        name: 'BP Headline 2',
        description: 'Starttoetsen',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl234'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Intro/IntroStartToetsen_v2',
                transition: true
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Title/Headline_STARTTOETS_v2'
            },
            // {
            //     type: 'wait',
            //     id: '750'
            // },
            // wait maybe
            // {
            //     type: 'wait',
            //     id: '200'
            // },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            },
            // hl video
            // maybe light? probably dim
        ]
    },
    'bp_hl3': {
        type: 'static',
        id: 'bp_hl3',
        name: 'BP Headline 3',
        description: 'Vives luchtverkeersleiding',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Intro/IntroATC_v2',
                transition: true
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Title/Headline_ATC_v2'
            },
            // wait maybe
            // {
            //     type: 'wait',
            //     id: '200'
            // },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            },
            // hl video
            // maybe light? probably dim
        ]
    },
    'bp_hl4': {
        type: 'static',
        id: 'bp_hl4',
        name: 'BP Headline 4',
        description: 'Maaidood ardennen',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Intro/IntroRee_v2',
                transition: true
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Title/Headline_REE_v2'
            },
            // wait maybe
            // {
            //     type: 'wait',
            //     id: '200'
            // },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            }
            // hl video
            // maybe light? probably dim
        ]
    },
    'bp_vote': {
        type: 'static',
        id: 'bp_vote',
        name: 'BP Vote',
        description: 'Voting',
        actions: [
            {
                type: 'vote_trigger',
                id: 'jn_mxm_bp_items'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Intro/TTVote_v1',
                transition: true
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 5
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Title/Headline_VOTEWAIT_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            }
        ]
    },

    bp_intro: {
        type: 'static',
        id: 'bp_intro',
        name: 'BP Intro',
        description: 'Generiek en vote stop',
        actions: [
            {
                type: 'vote_end'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Generiekfull_v3'
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_apotheose'
            }
        ]
    },

    bp_studio: {
        type: 'static',
        id: 'bp_studio',
        name: 'BP Studio',
        description: 'Back to studio',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 1,
                clip: 'studiobg'
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            }
        ]
    },


    bp_fullrun_keulen_ident: {
        type: 'static',
        id: 'bp_fullrun_keulen_ident',
        name: 'Ident Keulen',
        description: 'Run Keulen newsitem ident',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Ident/FullIdent_KEULEN_v3'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_ident_title'
            }
        ]

    },
    bp_fullrun_keulen_start: {
        type: 'static',
        id: 'bp_fullrun_keulen_start',
        name: 'Fullrun Keulen',
        description: 'Run Keulen newsitem',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            }
        ]

    },
    bp_fullrun_keulen_repo: {
        type: 'static',
        id: 'bp_fullrun_keulen_repo',
        name: 'Fullrun Keulen Repo',
        description: 'Start repo keulen',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Repos/RepoKeulen_v1'
            },
            {
                type: 'wait',
                id: '500'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Title/Headline_KEULEN_v2'
            }
        ]
    },

    bp_fullrun_startexamen_ident: {
        type: 'static',
        id: 'bp_fullrun_startexamen_ident',
        name: 'Ident Start Examen',
        description: 'Start Examen ident',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Ident/FullIdent_STARTTOETS_v3'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_ident_title'
            }
        ]
    },
    bp_fullrun_startexamen_start: {
        type: 'static',
        id: 'bp_fullrun_startexamen_start',
        name: 'Fullrun Start Examen',
        description: 'Run Start Examen newsitem',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            }
        ]
    },
    bp_fullrun_startexamen_repo: {
        type: 'static',
        id: 'bp_fullrun_startexamen_repo',
        name: 'Fullrun Start Examen Repo',
        description: 'Start repo starttoetsen',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Repos/RepoStartexamens_v1'
            }
        ]
    },

    bp_fullrun_atc_ident: {
        type: 'static',
        id: 'bp_fullrun_atc_ident',
        name: 'Ident ATC',
        description: 'Run ATC newsitem ident',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Ident/FullIdent_ATC_v3'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_ident_title'
            }
        ]
    },
    bp_fullrun_atc_start: {
        type: 'static',
        id: 'bp_fullrun_atc_start',
        name: 'Fullrun ATC',
        description: 'Run ATC newsitem',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            }
        ]
    },
    bp_fullrun_atc_repo: {
        type: 'static',
        id: 'bp_fullrun_atc_repo',
        name: 'Fullrun ATC Repo',
        description: 'Start repo atc',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Repos/RepoATC_v1'
            }
        ]
    },

    bp_fullrun_ree_ident: {
        type: 'static',
        id: 'bp_fullrun_ree_ident',
        name: 'Ident Ree',
        description: 'Run Ree ident',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Ident/FullIdent_REE_v3'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_ident_title'
            }
        ]
    },
    bp_fullrun_ree_start: {
        type: 'static',
        id: 'bp_fullrun_ree_start',
        name: 'Fullrun Ree',
        description: 'Run Ree newsitem',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 3
            }
        ]
    },
    bp_fullrun_ree_repo: {
        type: 'static',
        id: 'bp_fullrun_ree_repo',
        name: 'Fullrun Ree Repo',
        description: 'Start repo ree',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Repos/RepoRee_v1'
            }
        ]
    },


    bp_introtest: {
        type: 'static',
        id: 'bp_introtest',
        name: 'BP Introtest',
        description: 'Test',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'clear',
                channel: 1,
                layer: 2
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'Generiekfull_v3'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_apotheose'
            }
        ]
    },


    bp_dynamicitem1: {
        type: 'dynamic',
        id: 'bp_dynamicitem1',
        name: 'BP Dynamic Item 1',
        description: 'Dynamic item 1, this will be replaced by the latest vote results',
        voteidx: 0,
        fallbackrundownitems: [
            'bp_fullrun_keulen_start',
            'bp_fullrun_keulen_repo'
        ]
    },
    bp_dynamicitem2: {
        type: 'dynamic',
        id: 'bp_dynamicitem2',
        name: 'BP Dynamic Item 2',
        description: 'Dynamic item 2, this will be replaced by the latest vote results',
        voteidx: 1,
        fallbackrundownitems: [
            'bp_fullrun_ree_ident',
            'bp_fullrun_ree_start',
            'bp_fullrun_ree_repo'
        ]
    },

    bp_weather: {
        type: 'static',
        id: 'bp_weather',
        name: 'BP Weather',
        description: 'Start weer',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_weer'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'weerkaart'
            }
        ]
    },


    'bp_outro_keulen': {
        type: 'static',
        id: 'bp_outro_keulen',
        name: 'BP Outro Keulen',
        description: '',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_eind'
            },
            {
                type: 'wait',
                id: '1500'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Outro/OutroKeulen_v1',
                transition: true
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'outro_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_copyright'
            }
        ]
    },
    'bp_outro_startexamen': {
        type: 'static',
        id: 'bp_outro_startexamen',
        name: 'BP Outro Start Examen',
        description: '',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_eind'
            },
            {
                type: 'wait',
                id: '1500'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Outro/OutroStartexamen_v1',
                transition: true
            },
            {
                type: 'wait',
                id: '16500'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'outro_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_copyright'
            }
        ]
    },
    'bp_outro_atc': {
        type: 'static',
        id: 'bp_outro_atc',
        name: 'BP Outro ATC',
        description: '',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_eind'
            },
            {
                type: 'wait',
                id: '1500'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Outro/OutroATC_v1',
                transition: true
            },
            {
                type: 'wait',
                id: '6200'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'outro_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_copyright'
            }
        ]
    },
    'bp_outro_ree': {
        type: 'static',
        id: 'bp_outro_ree',
        name: 'BP Outro Ree',
        description: '',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_eind'
            },
            {
                type: 'wait',
                id: '1500'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 2,
                clip: 'Outro/OutroRee_v1',
                transition: true
            },
            {
                type: 'wait',
                id: '9200'
            },
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'outro_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_copyright'
            }
        ]
    },

    bp_outro: {
        type: 'static',
        id: 'bp_outro',
        name: 'BP Outro',
        description: 'Outro without end clips',
        actions: [
            {
                type: 'blinken_video',
                cmd: 'play',
                channel: 1,
                layer: 4,
                clip: 'outro_v2'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_copyright'
            }
        ]
    },

    'playintro': {
        type: 'static',
        id: 'playintro',
        name: 'Play intro',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_apotheose'
            },
            {
                type: 'blinken_light',
                id: 'l_intro'
            }
        ]
    },
    'do_terzake': {
        type: 'static',
        id: 'do_terzake',
        name: 'Run Terzake',
        description: 'Run the Terzake program rundown',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'tz_2024_clock'
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'jingle_trigger',
                id: 'tz_2024_headlines'
            },
            {
                type: 'wait',
                id: '1000'
            },
            {
                type: 'jingle_trigger',
                id: 'tz_2024_topic'
            },
            {
                type: 'wait',
                id: '6000'
            },
            {
                type: 'jingle_trigger',
                id: 'tz_2024_intro'
            }
        ]
    },
    'do_journaal': {
        type: 'static',
        id: 'do_journaal',
        name: 'Run Journaal',
        description: 'Run the Journaal program rundown',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'jn_mxm_counter'
            },
            {
                type: 'wait',
                id: '10000'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_mxm_start'
            },
            {
                type: 'wait',
                id: '7000'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_mxm_hl1'
            },
            {
                type: 'wait',
                id: '4000'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl234'
            },
            {
                type: 'wait',
                id: '500'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            },

            {
                type: 'wait',
                id: '4000'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            },
            {
                type: 'wait',
                id: '4000'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_hl_switch'
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'jingle_trigger',
                id: 'jn_2013_j19_apotheose'
            },
        ]
    },
    'do_d7d': {
        type: 'static',
        id: 'do_d7d',
        name: 'Run De zevende dag',
        description: 'Run the 7dag program rundown',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'd7_2024_hl'
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'jingle_trigger',
                id: 'd7_2024_topic'
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'jingle_trigger',
                id: 'd7_2024_topic'
            },
            {
                type: 'wait',
                id: '5000'
            },
            {
                type: 'jingle_trigger',
                id: 'd7_2024_topic'
            },
            {
                type: 'wait',
                id: '10000'
            },
            {
                type: 'jingle_trigger',
                id: 'd7_2024_intro'
            }
        ]
    },
    'do_daf': {
        type: 'static',
        id: 'do_daf',
        name: 'De afspraak run',
        description: 'Run the De afspraak program rundown',
        actions: [
            {
                type: 'jingle_trigger',
                id: 'df_2024_opener'
            },
            {
                type: 'wait',
                id: '15000'
            },
            {
                type: 'jingle_trigger',
                id: 'df_2024_intro'
            }
        ]
    }
}

export const getRundownAction = (id: string) => {
    const action = rundownActions[id];
    if (!action) {
        throw new Error(`Rundown action with id ${id} not found`);
    }
    return { ...action };
};

export const bachelorRundown = [
    'bp_load',
    'bp_clock',
    'bp_start',
    'bp_hl1',
    'bp_hl2',
    'bp_hl3',
    'bp_hl4',
    'bp_vote',
    'bp_intro',


    // 'bp_introtest',

    'bp_dynamicitem1',
    'bp_dynamicitem2',

    'bp_studio',
    'bp_weather',
    'bp_studio',

    'bp_outro_keulen',
    'bp_outro_startexamen',
    'bp_outro_atc',
    'bp_outro_ree',
    'bp_outro' // just in case
]


export const getBachelorRundown = () => {
    return bachelorRundown.map(id => {
        const action = getRundownAction(id);
        return { action };
    });
}

export const getDynamicRundown = () => {
    const voteStore = useVoteStore();

    // we start with bachelor rundown, 
    // if one of the rundown items is dynamicitem get the given idx from the latest vote results this can be multiple rundown items
    // otherwise just get the rundown item directly

    const rundown = bachelorRundown.map(id => {
        const action = getRundownAction(id);
        if (action.type === 'dynamic') {
            const latestVote = voteStore.computedVoteBracket
            const rditems = latestVote[action.voteidx]?.rundownitems || [];

            // if there's no latestvote return fallback items
            if (!latestVote || !rditems.length) {
                console.warn(`No latest vote results found for dynamic action ${action.id}, using fallback rundown items`);
                return action.fallbackrundownitems.map(itemId => {
                    const fallbackAction = getRundownAction(itemId);
                    fallbackAction.description = `!!!FALLBACK!!! ${fallbackAction.description}`;
                    return fallbackAction;
                });
            }
            // return each rditem

            return rditems.map(rditem => getRundownAction(rditem));
        }
        return action;
    }).flat();

    console.log('Dynamic rundown:', rundown);

    return rundown;
}
