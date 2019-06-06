<template>
  <div>
    <Modal title="QR Scanner" ref="qrScanner">
      <div slot="content">
        <div v-if="!initialized" class="cam-placeholder">
          <span v-if="errorMessage">{{errorMessage}}</span>
        </div>
        <qrcode-stream
          @decode="onDecode"
          @init="onInit"
          :style="{height: this.initialized ? auto : 0}"
        ></qrcode-stream>
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
      initialized: false,
      errorMessage: null
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
            this.errorMessage = "No access to the camera.";
          } else if (error.name === "NotFoundError") {
            this.errorMessage = "No camera found on this device.";
          } else if (error.name === "NotSupportedError") {
            this.errorMessage =
              "Started from inside a non-secure context (should be HTTPS, localhost or file://)";
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
.cam-placeholder {
  background-image: url("./assets/cam-placeholder.png");
  background-size: cover;
  background-position: center;
  height: 300px;
  color: #797979;
  margin: 20px;
}
.content {
  margin: auto;
}
.temp-img {
  margin: auto;
  width: 160px;
  position: absolute;
  left: 35%;
  top: 10%;
}
.descriptionTextPass {
  color: #bdbdbd;
  padding: 30px 10px;
}
</style>

