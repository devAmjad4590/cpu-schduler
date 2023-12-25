<template>
    <div class="gantt">
        <h3 class="gantt-text">{{ process.process  }}</h3>
    </div>
</template>

<script>

export default{
    props: {
        process: {
            type: Object,
            required: true
        }
    }
}
</script>


<style>

.gantt{
    border: 2px solid #ffbb00;
    text-align: center;
    width: 43px;
    height: 30px;
    background-color: #c99506;
}

.gantt-text{
    margin-top: 5px;
    color: #e7e5ff;
    margin-right: 12px;
}

</style>