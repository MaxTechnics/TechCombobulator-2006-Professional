interface BackstageAction {
    type: 'jingle_trigger' | 'blinken_light' | 'blinken_video' | 'wait';
    id: string;
}

interface RundownAction {
    name: string;
    description?: string;
    actions: BackstageAction[];
}

const rundownActions: { [action_id: string]: RundownAction } = {
    'playintro': {
        name: 'Play intro',
        actions: [
            {
                type: 'jingle_trigger',
                id: ''
            }
        ]
    },
    'do_terzake': {
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
    return action;
};
