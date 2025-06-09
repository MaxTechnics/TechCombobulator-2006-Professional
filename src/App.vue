<template>
    <Error v-if="isError !== ''">{{ isError }}</Error>
    <main v-else class="window" style="box-sizing: border-box; height: 100%;">
        <div class="cont" v-if="!hasLoaded">
            <div class="title-bar" style="-webkit-app-region: drag">
                <div class="title-bar-text">The fucking app loads</div>
            </div>
            <div class="window-body windowcontent">
                <LoadingView @load="hasLoaded = true" />
            </div>
            <div class="status-bar status" style="align-self: flex-end;">
                <p class="status-bar-field">System ready</p>
                <p class="status-bar-field">TBAow</p>
                <p class="status-bar-field">
                    <ClockThing />
                </p>
            </div>
        </div>

        <div class="cont" v-else>
            <div class="title-bar">
                <div class="title-bar-text" style="-webkit-app-region: drag;">The TechCombobulator 2006 Professional</div>
                <div class="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Restore"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>

            <div class="window-body windowcontent">
                <p>Notice<br>If you notice this notice you will notice that this notice is not worth noticing.</p>
                <img style="position: absolute; top: 30px; right: 5px; height: 75px;" :src="spin" />

                <section class="tabs">
                    <menu role="tablist" aria-label="Sample Tabs">
                        <button @click="activeTab = 'rundown'" role="tab" :aria-selected="activeTab === 'rundown'" aria-controls="tab-A">Rundown</button>
                        <button @click="activeTab = 'actions'" role="tab" :aria-selected="activeTab === 'actions'" aria-controls="tab-A">Actions</button>
                        <button @click="activeTab = 'debug'" role="tab" :aria-selected="activeTab === 'debug'" aria-controls="tab-B">Debug</button>
                        <button @click="activeTab = 'clippy'" role="tab" :aria-selected="activeTab === 'clippy'" aria-controls="tab-C">Clippy</button>
                    </menu>

                    <article v-if="activeTab === 'rundown'" role="tabpanel" id="tab-A">
                        <div class="actions_view">
                            <p>hi</p>
                            <!-- <fieldset v-for="(group, groupName) in jingleActions" :key="groupName">
                                <legend>{{ groupName }}</legend>
                                <button @click="sendjingle(action.id)" v-for="action in group" :key="action.id">{{ action.name }}</button>
                            </fieldset> -->
                            <fieldset>
                                <legend>Backstage demo</legend>
                                <button @click="clip?.speak('Debugger? I hardly know her!', false);">Start counter</button>
                                <button>Start jnl</button>
                                <button>Headline 1</button>
                                <button>Headline 2</button>
                                <button>Headline 3</button>
                                <button>Headline 4</button>
                                <button>Start voting</button>
                                <button>Finish voting</button>
                                <button>Cancel voting</button>
                                <button>Start pres</button>
                                <button>Item 1</button>
                                <button>Item 2</button>
                                <button>Item 3</button>
                                <button>Item 4</button>
                                <button>Weer</button>
                                <button>Groet</button>
                                <button>Outro</button>
                            </fieldset>

                            <VotePanel :realtimeChannel="bsChannel" />
                            <div role="tooltip">A balloon is better known as tooltip in web development.</div>
                        </div>
                    </article>

                    <article v-if="activeTab === 'actions'" role="tabpanel" id="tab-A">
                        <div class="actions_view">
                            <p>hi</p>
                            <fieldset v-for="(group, groupName) in jingleActions" :key="groupName">
                                <legend>{{ groupName }}</legend>
                                <button @click="sendjingle(action.id)" v-for="action in group" :key="action.id">{{ action.name }}</button>
                            </fieldset>
                        </div>
                    </article>

                    <article v-if="activeTab === 'debug'" role="tabpanel" id="tab-B">
                        <section class="field-row" style="justify-content: flex-end">
                            <button @click="clip?.play('Wave'); dothing()">Quit</button>
                            <button @click="executeRundownActions(bsChannel, 'do_terzake')">Walk rundownactions</button>
                            <button @click="clip?.play('Thinking')" class="default">Load all</button>
                            <StartBtn @click=" clip?.play('Wave'); clip?.speak('This does not work :c')">Start</StartBtn>
                        </section>
                    </article>

                    <article role="tabpanel" hidden id="tab-C">

                    </article>
                </section>
            </div>

            <div class="status-bar window-body status" style="align-self: flex-end;">
                <p class="status-bar-field">System ready</p>
                <p class="status-bar-field">
                    <RealtimeLatency :supa_client="supabase" />
                </p>
                <p class="status-bar-field">
                    <ClockThing />
                </p>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, onErrorCaptured } from 'vue';
import clippy, { Agent } from './clippy/index';
import LoadingView from './Views/LoadingView.vue';
import { executeRundownActions } from './lib/rundownmgr';
import Error from './Views/Error.vue';
import StartBtn from './components/StartBtn.vue'
// import clippymap from './clippy/agents/Clippy/map.png';
import { createClient } from '@supabase/supabase-js';
import RealtimeLatency from './components/RealtimeLatency.vue';
import { jingleActions } from './actions/audio';
import spin from './images/undertale-dog.gif';
import VotePanel from './Views/VotePanel.vue';
import ClockThing from './components/ClockThing.vue';

const hasLoaded = ref(false);
const activeTab = ref<'rundown' | 'actions' | 'oldjingles' | 'debug' | 'clippy'>('debug');

const env = import.meta.env
const supabase = createClient(env.VITE_APP_SUPABASE_URL, env.VITE_APP_SUPABASE_KEY)

const bsChannel = supabase.channel('backstage', {
    config: { broadcast: { ack: true } }
}).subscribe();

bsChannel.on('broadcast', { event: 'acknowledge' }, () => {
    console.log('Event acknowledged');
});

const sendjingle = async (id: string) => {
    console.log('Dojingle', id)
    bsChannel.send({
        type: 'broadcast',
        event: 'jingle_action',
        payload: { action_id: id }
    })
}

// Status bar
const updateClock = () => {
    const date = new Date();
    const formatted = Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
    time.value = formatted;
};
const time = ref('HUUH???');

const clip = ref<Agent | undefined>();

const dothing = () => {
    clip?.value.moveTo(window.innerWidth - 170, 30, 0);
}

onMounted(() => {
    setInterval(updateClock, 100);

    console.log(window.innerWidth)

    clippy.load({
        name: 'Clippy',
        // selector: 'my-clippy',
        successCb: (agent) => {
            clip.value = agent
            agent.moveTo(40, 40, 0)
            console.log(agent.animations())
            // agent.show(false);

            agent.play('Greeting')
            agent.speak("Debugger? I hardly know her!", false);
            // agent.play('Congratulate', 10000);
            // agent.animate();
        },
        failCb: (e) => {
            console.error(e)
        }
    })
    clip.value.moveTo(100, 130, 0)
    dothing()
});


const isError = ref('');
onErrorCaptured((err: any) => {
    console.error('error captured, ', err);
    isError.value = err.message;
    return false;
});
</script>

<style lang="scss" scoped>
.title-bar-text {
    width: -webkit-fill-available;
    height: inherit;
    display: flex;
    align-items: center;
}

.cont {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.windowcontent {
    /* flex-grow: 1; */
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
}

h1 {
    margin-left: 20px;
    margin-top: 0;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: -10px 10px 0px #00e6e6, -20px 20px 0px #01cccc, -30px 30px 0px #00bdbd;
}

.actions_view {
    fieldset {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
}

.jingles_old {
    button {
        width: fit-content;
    }
    
    .jingle_thihing_container {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }
}

.debugging_view {
    .debugbuttonctr {
        display: flex;
        gap: 6px;
    }

    .field-row-stacked-but-from-mxm {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .button_container {
        display: flex;
        gap: 6px;
        justify-content: end;
    }
}

.status {
    width: 100%;
    & p{

        padding-left: 8px;
        padding-right: 8px;
    }
}
</style>
