<template>

    <ul class="destinations">
        <li class="destinationElement">

            <span class="destinationAddress" title="Address Destination">{{this.unencodedAddress }}</span>

            <div class="money" title="Amount">
                <span class="amount">{{this.amount}}</span><span class="currency">WEBD</span>
            </div>

        </li>
    </ul>

</template>

<script>

    export default{

        props:{
            toAddress: {default: null}
        }

    }

</script>