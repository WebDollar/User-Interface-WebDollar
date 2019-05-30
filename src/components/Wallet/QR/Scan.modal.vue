<template>
  <div>
    <Modal title="QR Scanner" ref="qrScanner">
      <div slot="content">
        <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "components/UI/modal/Modal.vue";
import Notification from "helpers/Notification.helpers";

export default {
  components: {
    Modal: Modal
  },

  data: () => {
    return {
      scannedUrl: null,
      initialized: false
    };
  },

  methods: {
    closeModal() {
      this.$refs["qrScanner"].closeModal();
    },

    showModal(e) {
      if (this.$refs["qrScanner"].modalOpened === false) {
        this.$refs["qrScanner"].showModal();
      }
    },

    onDecode(content) {
      this.scannedUrl = content;
      window.location.href = content;
    },

    onInit(promise) {
      promise
        .then(() => {
          this.initialized = true;
          console.log("Successfully initilized! Ready for scanning now!");
        })
        .catch(error => {
          if (error.name === "NotAllowedError") {
            this.errorMessage = "Hey! I need access to your camera";
          } else if (error.name === "NotFoundError") {
            this.errorMessage = "Do you even have a camera on your device?";
          } else if (error.name === "NotSupportedError") {
            this.errorMessage =
              "Seems like this page is served in non-secure context (HTTPS, localhost or file://)";
          } else if (error.name === "NotReadableError") {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?";
          } else if (error.name === "OverconstrainedError") {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?";
          } else {
            this.errorMessage = "UNKNOWN ERROR: " + error.message;
          }
        });
    }
  }
};
</script>

<style>
.content {
  margin: auto;
}
.temp-img {
  margin: auto;
  width: 160px;
  position: absolute;
  left:35%;
  top: 10%;

}
.descriptionTextPass {
  color: #bdbdbd;
  padding: 30px 10px;
}
</style>

