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
        Search: <input v-model="search" type="text" data-test="search" />
      </div>
      <div>
        Date From: <input v-model="dateFrom" type="datetime-local" data-test="dateFrom"   />
        Date To: <input v-model="dateTo" type="datetime-local" data-test="dateTo"  />
        <input v-model="isDateFilter" type="checkbox" />apply date filter
      </div>
      <button
        data-test="apply"
        @click="apply" >Apply</button>
    </div>
</template>