<!--
Download svgs from https://icomoon.io/app/#/select/image
-->

<template>

    <div @click="this.handleClick">

        <svgChevronUp v-if="this.icon === 'chevron-up'"></svgChevronUp>
        <svgChevronDown v-if="this.icon === 'chevron-down'"></svgChevronDown>
        <svgKey v-if="this.icon === 'key'"></svgKey>
        <svgLockClosed v-if="this.icon === 'lock-closed'"></svgLockClosed>
        <svgLockOpen v-if="this.icon === 'lock-open'"></svgLockOpen>
        <svgPlus v-if="this.icon === 'plus'"></svgPlus>
        <svgPlusSquare v-if="this.icon === 'plus-square'"></svgPlusSquare>
        <svgX v-if="this.icon === 'x'"></svgX>
        <svgUpload v-if="this.icon === 'upload'"></svgUpload>
        <svgDownload v-if="this.icon === 'download'"></svgDownload>

    </div>

</template>


<script>

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

    export default{

        props:{
            icon: {default: ''}
        },

        components:{
            "svgKey": svgKey,
            "svgChevronDown": svgChevronDown,
            "svgChevronUp": svgChevronUp,
            "svgLockClosed": svgLockClosed,
            "svgLockOpen": svgLockOpen,
            "svgPlus": svgPlus,
            "svgPlusSquare": svgPlusSquare,
            "svgX": svgX,
            "svgDownload": svgDownload,
            "svgUpload": svgUpload,
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