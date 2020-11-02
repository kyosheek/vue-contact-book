<template>
  <div
    class="contact-card"
    @click="!mouseOverButton && handleDivClick()"
    @mouseover="mouseOverDiv = true"
    @mouseleave="mouseOverDiv = false">
    <div class="contact-card__info">
      <h3 class="contact-card__info__name">{{ name }}</h3>
      <p class="contact-card__info__work">{{ work }}</p>
    </div>
    <transition name="slide-fade">
      <button
        v-if="mouseOverDiv"
        class="button contact-card__button mdc-icon-buttons material-icons md-36 icon-red"
        @click="mouseOverButton && handleButtonClick()"
        @mouseover="mouseOverButton = true"
        @mouseleave="mouseOverButton = false">
        delete
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  data() {
    return {
      mouseOverDiv: false,
      mouseOverButton: false,
    };
  },
  emits: ['delete'],
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
  computed: {
    name() {
      const { firstName, lastName } = this.data;
      let res = firstName.length > 0 ? `${firstName} ` : '';
      res += lastName.length > 0 ? lastName : '';
      return res;
    },
    work() {
      const { position, company } = this.data;
      let res = position.length > 0 ? position : '';
      res += company.length > 0 ? ` at ${company}` : '';
      return res;
    },
  },
  methods: {
    handleDivClick() {
      this.$router.push({
        name: 'Contact',
        params: { id: this.data.id },
      });
    },
    handleButtonClick() {
      this.$emit('delete');
    },
  },
};
</script>

<style scoped>
h3, p {
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.contact-card, .contact-card > * {
  cursor: pointer;
}

.contact-card {
  position: relative;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.15);
  border-radius: 5px;

  margin: 20px;
  height: 80px;
}

.contact-card:first-of-type {
  margin-top: 0;
}

.contact-card__info {
  position: relative;
  left: 0;
  display: inline-block;
  text-align: left;
  float: left;
  margin-left: 20px;
  width: calc(100% - 40px);
}

h3 {
  margin-top: 0.5em;
}

p {
  margin-top: 1em;
}

.contact-card__button {
  margin-top: 0;
  position: absolute;
  right: 0;
  width: 80px;
  height: 80px;
  opacity: 1;
  border-radius: 0 5px 5px 0;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0);
  text-align: center;
}

.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0);
}
.slide-fade-enter-to, .slide-fade-leave {
  opacity: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>
