<template>
  <div class="contact-info-content">
    <template v-for="(val, key) in this.info" :key="key">
      <p>{{ `${key}: ${val}` }}</p><br />
    </template>
  </div>
  <div class="contact-info-right-aside">
  </div>
</template>

<script>
export default {
  name: 'Contact',
  components: {
  },
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
      id: null,
      info: null,
      reservedFields: ['firstName', 'lastName', 'position', 'company'],
      removing: false,
      toRemove: null,
    };
  },
  methods: {
  },
  created() {
    this.id = this.data.id;
    delete this.data.id;
    this.info = this.data;
  },
};
</script>

<style>
.contact-info-content {
  flex: 0 1 60vw;
}

.contact-info-right-aside {
  flex: 0 1 20vw;
}
</style>
