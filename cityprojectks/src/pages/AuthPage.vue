<script setup>
import AppAuthForm from '@/components/AppAuthForm.vue';
</script>
<template>
    <div class="page">
        <nav class="py-sm ">
            <img src="../assets/img/logo.png" alt="" class="logo" />
        </nav>
        <div class="flex justify-center">
            <AppAuthForm />
        </div>
    </div>
</template>
<style lang="css" scoped>
.page{
    height:100%;
    background-image: var(--gradient-bg),url(../assets/img/worldmap2.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.logo{
    height: 55px;
   
}
</style>
