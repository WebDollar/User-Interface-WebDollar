<!--
Download svgs from https://icomoon.io/app/#/select/image
-->

<template>

    <svg @click="this.handleClick" class="webdollarFont" xmlns="http://www.w3.org/2000/svg" :width="this.width" :height="this.height" :viewBox="'0 0 '+this.width+' '+this.width">

        <path v-if="icon === 'chevron-down'" d="M22.54 10.821l-9.938 9.924c-0.335 0.335-0.871 0.335-1.205 0l-9.938-9.924c-0.335-0.335-0.335-0.884 0-1.219l2.223-2.21c0.335-0.335 0.871-0.335 1.205 0l7.112 7.112 7.112-7.112c0.335-0.335 0.871-0.335 1.205 0l2.223 2.21c0.335 0.335 0.335 0.884 0 1.219z" ></path>
        <path v-if="icon === 'chevron-up'" d="M22.54 17.826l-2.223 2.21c-0.335 0.335-0.871 0.335-1.205 0l-7.112-7.112-7.112 7.112c-0.335 0.335-0.871 0.335-1.205 0l-2.223-2.21c-0.335-0.335-0.335-0.884 0-1.219l9.938-9.924c0.335-0.335 0.871-0.335 1.205 0l9.938 9.924c0.335 0.335 0.335 0.884 0 1.219z"></path>
        <path v-if="icon === 'download' || icon === 'down'" d="M12 23.25l11.25-11.25h-6.75v-12h-9v12h-6.75z"></path>
        <path v-if="icon === 'key'" d="M12.804 9c1.038-1.793 2.977-3 5.196-3 3.311 0 6 2.689 6 6s-2.689 6-6 6c-2.219 0-4.158-1.207-5.196-3h-3.804l-1.506-1.503-1.494 1.503-1.48-1.503-1.52 1.503-3-3.032 2.53-2.968h10.274zm7.696 1.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"></path>
        <path v-if="icon === 'lock-closed'" d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"></path>
        <path v-if="icon === 'lock-open'" d="M12 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v3h2v-3c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-4v14h18v-14h-12z"></path>
        <path v-if="icon === 'plus'" d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"></path>
        <path v-if="icon === 'plus-square'" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z"></path>
        <path v-if="icon === 'x'" d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
        <path v-if="icon === 'upload' || icon === 'up'"  d="M12 0.75l-11.25 11.25h6.75v12h9v-12h6.75z"></path>
        <path v-if="icon === 'mining'"  d="M23.672 19.429l-7.067-7.067c-0.438-0.438-1.153-0.438-1.591 0l-0.53 0.53-4.313-4.313 7.079-7.079h-7.5l-3.329 3.329-0.33-0.329h-1.591v1.591l0.329 0.329-4.829 4.83 3.75 3.75 4.829-4.829 4.313 4.313-0.53 0.53c-0.438 0.438-0.438 1.153 0 1.591l7.067 7.067c0.438 0.438 1.153 0.438 1.591 0l2.652-2.652c0.438-0.437 0.438-1.153 0-1.591z"></path>


    </svg>

</template>


<script>

    export default{

        props:{
            icon: {default: ''},
            style: {default: ''},
            width: {default: 24},
            height: {default: 24},
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
        fill: #f6cd69;
    }

    .webdollarFont path{

    }

</style>