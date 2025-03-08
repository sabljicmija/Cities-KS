<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        default: 'text',
    },
    modelValue: {
        type: [String, undefined],
        default: undefined,
    },
    label: {
        type: String,
        required: true,
    },
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <div class="input-container">
        <input 
        :id="props.id" 
        :type="props.type"
        :value="props.modelValue"  
        class="input px-lg pt-lg px-xs"
        placeholder=" "
        @input="(event) => {
            emit('update:modelValue', event.target.value)
        }"
        />
        
        <label :for="props.id" class="label">{{ props.label }}</label>
        
    </div>
</template>

<style lang="css" scoped>
.input-container{
    position: relative;
}
.input{
    display: block;
    border: none;
    border-radius: 9px;
    width: 100%;
    font-size: 16px;
    color: white;
    background-color: rgba(64, 64, 64, 0.5);

}
.input:focus{
outline: none;
}

.label{
    position: absolute;
    top:16px;
    left:24px;
    transition: transform 0.4s;
}
.input:focus + label{
    transform: scale(0.75) translateY(-12px);
}
.input:not(:placeholder-shown) + label{
    transform: scale(0.75) translateY(-12px);
}
</style>