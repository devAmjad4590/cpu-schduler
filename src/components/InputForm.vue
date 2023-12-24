<template>
    
    <div>
        <h3>{{ title }}</h3>
        <input type="text" class="input" placeholder="eg 3 0 4 2" v-model="input" @input="handleInput"
        >
    </div>
</template>

<script>
export default{
    name: 'InputForm',
    data(){
        return{
            input: '',
            numbers: []
        }
    },
    methods:{
        handleInput(){
            if(this.input != ''){
                this.numbers = this.input.split(' ').map(Number)
                this.$emit('input-change', this.numbers)
            }
        },
        clearForm(){
            this.input = ''
            this.numbers = []
        }
    },
    props:{
        title:{
            type: String,
            required: true
        }
    }
}
</script>

<style>
.input{
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: 4px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;


}
                
</style>