import { defineStore } from 'pinia'

export const useVoteStore = defineStore('vote', () => {
    // probably vote results sorted so rundown can action upon it

    const electionResult = ref();

    return { electionResult }
})
