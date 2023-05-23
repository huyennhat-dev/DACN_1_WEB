<template>
  <div class="vertical-gallery" ref="vertical">
    <div
      class="vertical-content"
      :style="{
        height: `${height - actionHeight}px`,
        top: `${actionHeight / 2}px`,
      }"
    >
      <div
        class="vertical-container"
        ref="verticalContainer"
        :style="{ top: `${contentTop}px` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: "auto",
      actionHeight: 0,
      contentHeight: 0,
      contentTop: 0,
      nextEnd: false,
    };
  },
  props: {
    itemHeight: {
      type: Number,
      default: 100,
    },
  },
  mounted() {
    setInterval(() => {
      this.nextFun();
    }, 3000);
    const parentStyle = getComputedStyle(this.$refs.vertical.parentNode);
    this.height = parseInt(parentStyle.height, 10);

    const contentStyle = getComputedStyle(this.$refs.verticalContainer);
    this.contentHeight = parseInt(contentStyle.height, 10);
  },
  methods: {
    nextFun() {
      const isItemHeight =
        this.contentHeight + this.contentTop - this.height + this.actionHeight;
      const scrollHeight = this.itemHeight * 10; // Giả sử bạn có 10 phần tử trong vòng lặp

      if (isItemHeight > 0 && isItemHeight > this.itemHeight) {
        this.contentTop -= this.itemHeight;
      } else {
        this.contentTop -= isItemHeight;

        if (this.contentTop < -scrollHeight) {
          this.contentTop = 0;
        }
      }
    },

    prevFun() {
      if (this.contentTop < 0 && this.contentTop + this.itemHeight < 0) {
        this.contentTop += this.itemHeight;
      } else {
        this.contentTop = 0;
      }
    },
  },
};
</script>

<style lang="less">
.vertical-gallery {
  position: relative;
  height: 100%;
  color: #666;
  .vertical-next,
  .vertical-prev {
    position: absolute;
    left: 0;
    width: 100%;
    height: 15px;
    background: #000;
    opacity: 0.5;
    cursor: pointer;
    z-index: 9;
    &:hover {
      opacity: 1;
    }
  }
  .vertical-next {
    bottom: 0;
  }
  .vertical-prev {
    top: 0;
  }
  .next-span,
  .prev-span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 5px;
    background: url("../assets/arrow.png") no-repeat;
    background-size: 100%;
  }
  .next-span {
    transform: translate(-50%, -50%);
  }
  .prev-span {
    transform: translate(-50%, -50%) rotate(-180deg);
  }
  .vertical-content {
    position: absolute;
    left: 0;
    width: 100%;
    overflow-y: scroll;
  }
  .vertical-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: all 0.3s linear;
  }
}
</style>
