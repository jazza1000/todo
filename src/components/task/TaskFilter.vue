<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { dateToISOString, stringToDate } from '@/mappers/date';
    
    const emit = defineEmits(['filtered']);

    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate()+30);

    const search = ref('')
    const dateFrom =ref(dateToISOString(now))
    const dateTo = ref(dateToISOString(future));
    const isDateFilter = ref(false);

    function apply() {
      emit('filtered', search.value)
    }
</script>

<template>
    <div class="search">
      <div>
        Search: <input v-model="search" type="text" />
      </div>
      <div>
        Date From: <input v-model="dateFrom" type="datetime-local"   />
        Date To: <input v-model="dateTo" type="datetime-local"  />
        <input v-model="isDateFilter" type="checkbox" />apply date filter
      </div>
      <button
        @click="apply">Apply</button>
    </div>
</template>