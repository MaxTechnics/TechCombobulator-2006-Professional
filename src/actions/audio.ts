interface CombobulatorAction {
    name: string;
    id: string;
}

export const jingleActions: { [group: string]: { [action_id: string]: CombobulatorAction } } = {
    'Journaal 2013 J13': {
        // goto sport J_OVER_NAAR_SPORT
        // back to news J_IDENT_LOGO
        /// eindtapijt J_VRTNIEUWSLIVE of weer // is zelfde tapijt, weer == live ingekrot
        // eind J_EIND_HL_TAPIJT
        // J_COPYRIGHT
        'jn_2013_opener': {
            name: 'Start Journaal',
            id: 'jn_2013_opener'
        },
        'jn_2013_ident_logo': {
            name: 'Ident Logo', // topic change
            id: 'jn_2013_ident_logo'
        },
        'jn_2013_ident_title': {
            name: 'Ident Title', // topic change
            id: 'jn_2013_ident_title'
        },
        'jn_2013_video_start': {
            name: 'Video/straksfie',
            id: 'jn_2013_video_start'
        },
        'jn_2013_video_end': {
            name: 'Video End',
            id: 'jn_2013_video_end'
        },
        'jn_2013_sport': {
            name: 'Trans Sport',
            id: 'jn_2013_sport'
        },
        // back to news: J_IDENT_LOGO
        'jn_2013_weer': {
            name: 'Weer',
            id: 'jn_2013_weer'
        },
        'jn_2013_eind': {
            name: 'Eind',
            id: 'jn_2013_eind'
        },
        'jn_2013_copyright': {
            name: 'Copyright',
            id: 'jn_2013_copyright'
        }


    },
    'Journaal 2013 J19': {
        // clock -> uitsmijter
        'jn_2013_j19_opener': {
            name: 'Start Journaal 7',
            id: 'jn_2013_j19_opener'
        },
        'jn_2013_j19_hl1': {
            name: 'Headline 1',
            id: 'jn_2013_j19_hl1'
        },
        'jn_2013_j19_hl234': {
            name: 'Headline 234',
            id: 'jn_2013_j19_hl234'
        },
        'jn_2013_j19_hl_switch': {
            name: 'Headline switch',
            id: 'jn_2013_j19_hl_switch'
        },
        'jn_2013_j19_apotheose': {
            name: 'Intro',
            id: 'jn_2013_j19_apotheose'
        }
    },
    'Journaal 2016': {
        'jn_2016_opener': {
            name: 'Start Journaal',
            id: 'jn_2016_opener'
        },
        'jn_2016_wipe_1': {
            name: 'Wipe 1',
            id: 'jn_2016_wipe_1'
        },
        'jn_2016_wipe_2': {
            name: 'Wipe 2',
            id: 'jn_2016_wipe_2'
        },
        'jn_2016_wipe_3': {
            name: 'Wipe 3',
            id: 'jn_2016_wipe_3'
        },
        'jn_2016_wipe_4': {
            name: 'Wipe 4',
            id: 'jn_2016_wipe_4'
        },
        'jn_2016_intro_long': {
            name: 'Intro Long',
            id: 'jn_2016_intro_long'
        },
        'jn_2016_intro_short': {
            name: 'Intro Short',
            id: 'jn_2016_intro_short'
        },
        'jn_2016_start_video': {
            name: 'Video Start',
            id: 'jn_2016_start_video'
        },
        'jn_2016_stop_video': {
            name: 'Video Stop',
            id: 'jn_2016_stop_video'
        },
        'jn_2016_start_straks': {
            name: 'Straks Start',
            id: 'jn_2016_start_straks'
        },
        'jn_2016_stop_straks': {
            name: 'Straks Stop',
            id: 'jn_2016_start_straks'
        },
        'jn_2016_weather': {
            name: 'Weer / Pre-eind',
            id: 'jn_2016_weather'
        },
        'jn_2016_end': {
            name: 'Eind',
            id: 'jn_2016_end'
        },
        'jn_2016_outro': {
            name: 'Outro',
            id: 'jn_2016_outro'
        }
    },
    'Terzake 2024': {
        'tz_2024_clock': {
            name: 'Start Clock',
            id: 'tz_2024_clock'
        },
        'tz_2024_headlines': {
            name: 'Headlines',
            id: 'tz_2024_headlines'
        },
        'tz_2024_topic': {
            name: 'Topic',
            id: 'tz_2024_topic'
        },
        'tz_2024_intro': {
            name: 'Intro',
            id: 'tz_2024_intro'
        },
        'tz_2024_bumper_topic': {
            name: 'Bumper Topic',
            id: 'tz_2024_bumper_topic'
        },
        'tz_2024_bumper_simple': {
            name: 'Bumper Simple',
            id: 'tz_2024_bumper_simple'
        },
        'tz_2024_bumper_soft': {
            name: 'Bumper Soft',
            id: 'tz_2024_bumper_soft'
        },
        'tz_2024_moodchange': {
            name: 'Mood change',
            id: 'tz_2024_moodchange'
        },
        'tz_2024_end': {
            name: 'Bedanking',
            id: 'tz_2024_end'
        },
        'tz_2024_outro': {
            name: 'Outro',
            id: 'tz_2024_outro'
        }
    },
    'De afspraak 2024': {
        'df_2024_opener': {
            name: 'Start',
            id: 'df_2024_opener'
        },
        'df_2024_intro': {
            name: 'Intro',
            id: 'df_2024_intro'
        },
        'df_2024_bumper_a': {
            name: 'Bumper A',
            id: 'df_2024_bumper_a'
        },
        'df_2024_bumper_b': {
            name: 'Bumper B',
            id: 'df_2024_bumper_b'
        },
        'df_2024_bedanking': {
            name: 'Bednaking',
            id: 'df_2024_bedanking'
        },
        'df_2024_outro': {
            name: 'Outro',
            id: 'df_2024_outro'
        }
    },
    'De Zevende Dag 2024': {
        'd7_2024_hl': {
            name: 'Headlines',
            id: 'd7_2024_hl'
        },
        'd7_2024_topic': {
            name: 'Topic Separator',
            id: 'd7_2024_topic'
        },
        'd7_2024_intro': {
            name: 'Begingeneriek',
            id: 'd7_2024_intro'
        },
        'd7_2024_bumper_menu': {
            name: 'Bumper Menu',
            id: 'd7_2024_bumper_menu'
        },
        'd7_2024_bumper_music': {
            name: 'Bumper Muziek',
            id: 'd7_2024_bumper_music'
        },
        'd7_2024_bumper_studio': {
            name: 'Bumper Studio',
            id: 'd7_2024_bumper_studio'
        },
        'd7_2024_bumper_titel': {
            name: 'Bumper Titel',
            id: 'd7_2024_bumper_titel'
        },
        'd7_2024_accent_1': {
            name: 'Accent 1',
            id: 'd7_2024_accent_1'
        },
        'd7_2024_accent_2': {
            name: 'Accent 2',
            id: 'd7_2024_accent_2'
        },
        'd7_2024_bedanking': {
            name: 'Bedanking',
            id: 'd7_2024_bedanking'
        },
        'd7_2024_outro': {
            name: 'Eindgeneriek',
            id: 'd7_2024_outro'
        }
    }
};

