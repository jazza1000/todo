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
        Search: <input type="text" v-model="search" />
      </div>
      <div>
        Date From: <input type="datetime-local" v-model="dateFrom"   />
        Date To: <input type="datetime-local" v-model="dateTo"  />
        <input type="checkbox" v-model="isDateFilter" />apply date filter
      </div>
      <button
        @click="apply">Apply</button>
    </div>
</template>