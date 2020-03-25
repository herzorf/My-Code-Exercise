<template>
  <div class="cell" v-on:click="onClickSelf">
    <template v-if="a">{{text}}</template>
    <template v-else></template>
  </div>
</template>
<script>
export default {
  props: ["n"],
  data() {
    return { a: false, text: "" };
  },
  methods: {
    onClickSelf() {
      if (this.text != "") {
        return;
      }
      this.a = true;
      this.text = this.n % 2 == 0 ? "x" : "o";
      this.$emit("click", this.text);
    }
  }
};
</script>
<style>
.cell {
  border: 1px black solid;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}
</style>
