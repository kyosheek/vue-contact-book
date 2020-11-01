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
        params: { ...this.data },
      });
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
