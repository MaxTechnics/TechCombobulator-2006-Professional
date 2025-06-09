<template>
    {{ time }}
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const clockInterval = ref();

const updateClock = () => {
    const date = new Date();
    const formatted = Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date);
    time.value = formatted;
};
const time = ref('HUUH???');

onMounted(() => {
    clockInterval.value = setInterval(updateClock, 100);
});

onBeforeUnmount(() => {
    clearInterval(clockInterval.value);
});
</script>
