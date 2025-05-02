<template>
    <div class="window-body">
        <img :src="pcok" style="width: 100%; height: 100%;" class="funny">
        <button @click="doLoad">Fuck yea</button>
    </div>
</template>

<script setup lang="ts">
import { starter } from '../player';
import pcok from '../images/pcthumbsup.gif';


const doLoad = () => {
    starter.play();
    emit('load');
}


const emit = defineEmits(['load']);
</script>

<style lang="scss" scoped>
.button_container {
    display: flex;
    gap: 6px;
    justify-content: end;
}

.funny {
    display: flex;
    justify-items: center;
    align-items: center;
}
</style>
