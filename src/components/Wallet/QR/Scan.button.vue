<template>
  <div class="scan-btn-container" v-on:click="scanQrCode">
    <div class="scan-btn-image">
    </div>
    <qr-scan-modal ref="qrScanModal"/>
  </div>
</template>

<script>
import qrScanModal from "./Scan.modal.vue";

export default {
  name: "qr-scan-btn",
  components: {
    qrScanModal
  },

  methods: {
    scanQrCode() {
      this.$refs["qrScanModal"].showModal();
    }
  }
};
</script>

<style>
.scan-btn-image {
  background-image: url('./assets/qr-icon.gif');
  background-size: contain;
  position: relative;
  height: 80%;
  width: 80%;
  cursor: pointer;
  margin-top: 4px;
  margin-left: 6px;
}
.scan-btn-container {

}
</style>
