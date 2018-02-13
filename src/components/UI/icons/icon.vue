<!--
Download svgs from https://icomoon.io/app/#/select/image
-->

<template>

    <div @click="this.handleClick">

        <svg-arrow-up v-if="this.icon === 'arrow-up'"></svg-arrow-up>
        <svg-arrow-down v-if="this.icon === 'arrow-down'"></svg-arrow-down>
        <svg-chevron-up v-if="this.icon === 'chevron-up'"></svg-chevron-up>
        <svg-chevron-down v-if="this.icon === 'chevron-down'"></svg-chevron-down>
        <svg-key v-if="this.icon === 'key'"></svg-key>
        <svg-lock-closed v-if="this.icon === 'lock-closed'"></svg-lock-closed>
        <svg-lock-open v-if="this.icon === 'lock-open'"></svg-lock-open>
        <svg-plus v-if="this.icon === 'plus'"></svg-plus>
        <svg-plus-square v-if="this.icon === 'plus-square'"></svg-plus-square>
        <svg-x v-if="this.icon === 'x'"></svg-x>
        <svg-upload v-if="this.icon === 'upload'"></svg-upload>
        <svg-download v-if="this.icon === 'download'"></svg-download>
        <svg-mining v-if="this.icon === 'mining'"></svg-mining>

    </div>

</template>


<script>

    import svgArrowDown from "./res/svg-arrow-down.vue"
    import svgArrowUp from "./res/svg-arrow-up.vue"
    import svgChevronDown from "./res/svg-chevron-down.vue"
    import svgChevronUp from "./res/svg-chevron-up.vue"
    import svgKey from "./res/svg-key.vue"
    import svgLockClosed from "./res/svg-lock-closed.vue"
    import svgLockOpen from "./res/svg-lock-open.vue"
    import svgPlus from "./res/svg-plus.vue"
    import svgPlusSquare from "./res/svg-plus-square.vue"
    import svgX from "./res/svg-x.vue"
    import svgUpload from "./res/svg-upload.vue"
    import svgDownload from "./res/svg-download.vue"
    import svgMining from "./res/svg-mining.vue"

    export default{

        props:{
            icon: {default: ''}
        },

        components:{
            "svg-arrow-down": svgArrowDown,
            "svg-arrow-up": svgArrowUp,
            "svg-key": svgKey,
            "svg-chevron-down": svgChevronDown,
            "svg-chevron-up": svgChevronUp,
            "svg-lock-closed": svgLockClosed,
            "svg-lock-open": svgLockOpen,
            "svg-plus": svgPlus,
            "svg-plus-square": svgPlusSquare,
            "svg-x": svgX,
            "svg-download": svgDownload,
            "svg-upload": svgUpload,
            "svg-mining": svgMining,
        },

        methods:{

            handleClick(e){
                this.$emit('click',e );
            }

        }

    }
</script>

<style>
    .webdollarFont{
        cursor: pointer;
        color: #f6cd69;
        transition: all .5s linear;
        text-decoration: none;
        width: 14px;
    }

    .webdollarFont path{
        fill: #f6cd69;
    }

</style>