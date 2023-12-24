<template>
    <div>
        <h1>{{ title }}</h1>
    </div>
</template>

<script>

export default {
    name: 'Header',
    props: {
        title:{
            type: String,
            required: true
        }

    }
}
</script>

<style>
h1 {
    color: #E7E5FF;
    font-size: 45px;
    text-align: center;
    margin-top: 50px;
}

</style>