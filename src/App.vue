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
                        <button @click="activeTab = 'bachelor'" role="tab" :aria-selected="activeTab === 'bachelor'" aria-controls="tab-bp">Bachelor</button>
                        <button @click="activeTab = 'rundown'" role="tab" :aria-selected="activeTab === 'rundown'" aria-controls="tab-A">Rundown (test)</button>
                        <button @click="activeTab = 'actions'" role="tab" :aria-selected="activeTab === 'actions'" aria-controls="tab-A">Actions</button>
                        <button @click="activeTab = 'debug'" role="tab" :aria-selected="activeTab === 'debug'" aria-controls="tab-B">Debug</button>
                        <button @click="activeTab = 'clippy'" role="tab" :aria-selected="activeTab === 'clippy'" aria-controls="tab-C">Clippy</button>
                    </menu>

                    <article v-if="activeTab === 'bachelor'" role="tabpanel" id="tab-bp">
                        <div class="">
                            <p>Rundown for Maxim's Journaal</p>
                            <fieldset>
                                <legend>Backstage demo</legend>
                                <section class="bp">
                                    <ul>
                                        <li v-for="item in getDynamicRundown()" :key="item.id" :class="{ active: rundown.active === item.id }" v-memo="[voteStore.computedVoteBracket, rundown.active]">
                                            <span>
                                                {{ item.name }} <br />
                                                {{ item.description }}<br />
                                            </span>
                                            <button @click="rundown.active = item.id; executeRundownActions(bsChannel, item.id)" style="margin-left: auto">Run</button>
                                        </li>
                                    </ul>
                                </section>
                            </fieldset>

                            <div class="actions_view">
                                <VotePanel :realtimeChannel="bsChannel" />

                                <fieldset>
                                    <legend>Rundown actions in case something goes amiss</legend>
                                    <button @click="executeRundownActions(bsChannel, id as string)" v-for="(action, id) in rundownActions" :key="id">{{ action.name + id }}</button>
                                </fieldset>
                            </div>
                        </div>
                    </article>

                    <article v-if="activeTab === 'rundown'" role="tabpanel" id="tab-A">
                        <div class="actions_view">
                            <p>hi</p>
                            <VotePanel :realtimeChannel="bsChannel" debug />

                            <fieldset>
                                <legend>Rundown actions</legend>
                                <button @click="executeRundownActions(bsChannel, id as string)" v-for="(action, id) in rundownActions" :key="id">{{ action.name + id }}</button>
                            </fieldset>
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
import { rundownActions, getBachelorRundown, type RundownAction, getDynamicRundown } from './actions/rundown';
import Error from './Views/Error.vue';
import StartBtn from './components/StartBtn.vue'
// import clippymap from './clippy/agents/Clippy/map.png';
import { createClient } from '@supabase/supabase-js';
import RealtimeLatency from './components/RealtimeLatency.vue';
import { jingleActions } from './actions/audio';
import spin from './images/undertale-dog.gif';
import VotePanel from './Views/VotePanel.vue';
import { useVoteStore } from './stores/vote';
import ClockThing from './components/ClockThing.vue';

const voteStore = useVoteStore();

const hasLoaded = ref(false);
const activeTab = ref<'bachelor' | 'rundown' | 'actions' | 'oldjingles' | 'debug' | 'clippy'>('bachelor');
const rundown = reactive<{
    active: string;
    // items: RundownAction[]
}>({
    active: '',
    // items: []
});

// rundown.items = getBachelorRundown();

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
const clip = ref<Agent | undefined>();

const dothing = () => {
    clip?.value.moveTo(window.innerWidth - 170, 30, 0);
}

onMounted(() => {
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

.bp ul {
  margin: 0 auto;
  padding: 0;
  max-height: 390px;
  overflow-y: auto;
  padding: 5px 5px 0 5px;
  border-left: none;
  border-right: none;
}

.bp li {
  list-style: none;
  background-color: rgba(0, 0, 0, 0.05);
  background-image: 
    linear-gradient(
      90deg,
      #FFD32E 10px,
      #EEE 10px,
      #EEE 11px,
      transparent 11px);
  padding: 10px 15px 10px 25px;
  border: 1px solid #CCC;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 3px;

  display: flex;

   &.active {
        background-image:  linear-gradient(
      90deg,
      #ff0000 10px,
      #EEE 10px,
      #EEE 11px,
      transparent 11px);;
    }
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
