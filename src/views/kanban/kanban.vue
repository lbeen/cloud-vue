<template>
    <router-view/>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
console.log(route.query)
</script>