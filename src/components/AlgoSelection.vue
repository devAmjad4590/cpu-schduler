<template>
    <div class="select">
        <h3>Algorithm</h3>
    <select v-model="selected" @change="handleOptionChange">
        <option selected disabled hidden >{{selected}}</option>
        <option v-for="option in options" v-bind:value="option" v-bind:key="option.value">
            {{ option.label }}
        </option>    
    </select>
</div>
    </template>
    
    <script>
    export default {
        name: 'AlgoSelection',
        data(){
            return{
                selected: 'Choose an Algorithm',
                options: [
                {label: 'Preemptive Shortest Job First', value: 'PSJF'},
                {label: 'Non Preemptive Shortest Job First', value: 'SJF'},
                {label: 'Non Preemptive Priority', value: 'P'},
                {label: 'Round Robin', value: 'RR'}
                ]
            }
        },
        methods:{
            handleOptionChange(){
                this.$emit('option-change', this.selected.value)
        }
    }
    }
    </script>

<style>
 

</style>
