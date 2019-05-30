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
      scannedUrl: ""
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
  }

};
</script>

<style>
.descriptionTextPass {
  color: #bdbdbd;
  padding: 30px 10px;
}

.inputDeleteModalPass {
  width: 100%;
  width: -webkit-fill-available;
  background-color: #2d2d2d;
  border: none;
  margin: 0 auto;
  left: 0;
  right: 0;
  color: #ccc;
  padding: 7px 0;
  font-weight: 100;
  font-size: 14px;
  padding-left: 5px;
}

.modalButtonPass {
  background-color: #131313;
  color: #969696;
  font-size: 12px;
  width: 140px;
  font-weight: bolder;
  border-radius: 5px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 20px;
  margin: 0 auto;
  cursor: pointer;
  border: solid 1px #5f5d5d;
  transition: all 0.3s linear;
}

.modalButtonPass:hover {
  background-color: #f6ba2c;
  color: #000000;
  transition: all 0.3s linear;
}

.inputAndGeneratorPass {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  border: solid 1px #5f5d5d;
  margin-bottom: 20px;
}

.generatorButtonPass {
  margin: 0 !important;
  width: 100% !important;
  border-radius: 0 !important;
  border: none;
  height: 15px !important;
  padding: 8px 0 !important;
}

.errorMessage {
  color: #de604d;
  padding-bottom: 20px;
  display: block;
}

.info {
  color: #ffd36c;
  padding-bottom: 20px;
  text-transform: uppercase;
  display: block;
  font-size: 12px;
}
</style>

