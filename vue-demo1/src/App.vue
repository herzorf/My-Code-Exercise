<template>
  <div class="wrapper">
    <div class="chess">
      <div>第{{n}}手</div>
      <div class="row">
        <Cell v-on:click="onClickCell(0,$event)" v-bind:n="n" />
        <Cell v-on:click="onClickCell(1,$event)" v-bind:n="n" />
        <Cell v-on:click="onClickCell(2,$event)" v-bind:n="n" />
      </div>
      <div class="row">
        <Cell v-on:click="onClickCell(3,$event)" v-bind:n="n" />
        <Cell v-on:click="onClickCell(4,$event)" v-bind:n="n" />
        <Cell v-on:click="onClickCell(5,$event)" v-bind:n="n" />
      </div>
      <div class="row">
        <Cell v-on:click="onClickCell(6,$event)" v-bind:n="n" />
        <Cell v-on:click="onClickCell(7,$event)" v-bind:n="n" />
        <Cell v-on:click="onClickCell(8,$event)" v-bind:n="n" />
      </div>
      <div>获胜方是：{{result}}</div>
    </div>
  </div>
</template>
<script>
import Cell from "./Cell";
export default {
  components: {
    Cell
  },
  data() {
    return {
      n: 0,
      map: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      result: null
    };
  },
  methods: {
    onClickCell(i, text) {
      console.log(`${i}   号被点击了，内容是：${text}`);
      this.map[Math.floor(i / 3)][i % 3] = text;
      this.n++;
      this.tell();
    },
    tell() {
      const map = this.map;
      for (let i = 0; i < 3; i++) {
        if (
          map[i][0] != null &&
          map[i][0] == map[i][1] &&
          map[i][1] == map[i][2]
        ) {
          this.result = map[i][2];
        }
      }
      for (let j = 0; j < 3; j++) {
        if (
          map[0][j] != null &&
          map[0][j] == map[1][j] &&
          map[1][j] == map[2][j]
        ) {
          this.result = map[2][j];
        }
      }

      if (
        map[0][0] != null &&
        map[0][0] == map[1][1] &&
        map[1][1] == map[2][2]
      ) {
        this.result = map[2][2];
      }

      if (
        map[0][2] != null &&
        map[0][2] == map[1][1] &&
        map[1][1] == map[2][0]
      ) {
        this.result = map[2][0];
      }
    }
  }
};
</script>
<style>
.row {
  display: flex;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>;
