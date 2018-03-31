<template>

    <ul class="destinations">
        <li class="destinationElement">

            <span class="destinationAddress" title="Address Destination">{{this.unencodedAddress.toString("hex") }}</span>

            <div class="money" title="Amount & Currency">
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