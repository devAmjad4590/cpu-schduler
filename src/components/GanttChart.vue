<template>
    <div class="flexbox">
        <Gantt v-for="(process, index) in queue" :key="index" :process="process"></Gantt>

    </div>
</template>

<script>
import Gantt from "./Gantt.vue";
export default{

    props: {
        queue: {
            type: Array,
            required: true
        }
    },
    components: {
        Gantt
    }
}

</script>

<style>
.flexbox{
    display: flex;
    flex-direction: row;
}

</style>