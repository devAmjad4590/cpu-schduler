<template>
    <div>
        <h3>Quantum</h3>
        <input v-model="input" type="number" @change="quantumListener">
    </div>
</template>

<script>
export default{
    data(){
        return{
            input: ''
        }
    },
    methods:{
        quantumListener(){
            // check if input is valid
            if(this.input < 0 || this.input == ''){
                alert('Please enter a valid quantum')
                this.input = ''
            }
            else
            this.$emit('quantum-change', this.input)
        },
        clearForm(){
            this.input = ''
        }
    }
}

</script>

<style>
input{
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