<template>
  <div class="contact-card" @click="!mouseOverButton && handleDivClick()">
    <h3 class="contact-card__name">{{ name }}</h3>
    <p class="contact-card__work">{{ work }}</p>
    <button
      @click="mouseOverButton && handleButtonClick()"
      @mouseover="mouseOverButton = true"
      @mouseleave="mouseOverButton = false">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  data() {
    return {
      contactInfo: this.data,
      mouseOverButton: false,
    };
  },
  props: {
    data: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: String,
    },
  },
  computed: {
    name() {
      const { firstName, lastName } = this.contactInfo;
      let res = firstName.length > 0 ? `${firstName} ` : '';
      res += lastName.length > 0 ? lastName : '';
      return res;
    },
    work() {
      const { position, company } = this.contactInfo;
      let res = position.length > 0 ? position : '';
      res += company.length > 0 ? ` at ${company}` : '';
      return res;
    },
  },
  methods: {
    handleDivClick() {
      this.$router.push(`/contact/${this.index}`);
    },
    handleButtonClick() {
      this.$emit('delete');
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.contact-card, .contact-card > * {
  cursor: pointer;
}
</style>
