<template>
  <i class="md-icon" v-html="svgContent" v-if="svgContent"></i>

  <img class="md-icon" :src="imageSrc" v-else-if="imageSrc"></img>

  <i class="md-icon material-icons" v-else>
    <slot></slot>
  </i>
</template>

<script>
  let registeredIcons = {};
  export default {
    props: {
      mdSrc: String
    },
    data: () => ({
      svgContent: null,
      imageSrc: null
    }),
    watch: {
      mdSrc() {
        this.svgContent = null;
        this.imageSrc = null;
        this.checkSrc();
      }
    },
    methods: {
      isImage(mimetype) {
        return mimetype.indexOf('image') >= 0;
      },
      isSVG(mimetype) {
        return mimetype.indexOf('svg') >= 0;
      },
      setSVGContent(value) {
        this.svgContent = value;
        this.$nextTick(() => {
          this.$el.children[0].removeAttribute('fill');
        });
      },
      loadSVG() {
        if (!registeredIcons[this.mdSrc]) {
          const request = new XMLHttpRequest();
          const self = this;
          request.open('GET', this.mdSrc, true);
          request.onload = function() {
            const mimetype = this.getResponseHeader('content-type');
            if (this.status >= 200 && this.status < 400 && self.isImage(mimetype)) {
              if (self.isSVG(mimetype)) {
                registeredIcons[self.mdSrc] = this.response;
                self.setSVGContent(this.response);
              } else {
                self.loadImage();
              }
            } else {
              console.warn(`The file ${self.mdSrc} is not a valid image.`);
            }
          };
          request.send();
        } else {
          this.setSVGContent(registeredIcons[this.mdSrc]);
        }
      },
      loadImage() {
        this.imageSrc = this.mdSrc;
      },
      checkSrc() {
        if (this.mdSrc) {
          if (this.mdSrc.indexOf('.svg') >= 0) {
            this.loadSVG();
          } else {
            this.loadImage();
          }
        }
      }
    },
    mounted() {
      this.checkSrc();
    }
  };
</script>



<style lang="scss">

$icon-size: 24px;

@mixin icon-size($size: $icon-size) {
  width: $size;
  min-width: $size;
  height: $size;
  min-height: $size;
  font-size: $size;
}

.md-icon {
  @include icon-size();
  margin: auto;
  display: inline-flex;
  align-items: center;
  fill: currentColor;
  text-rendering: optimizeLegibility;
  vertical-align: middle;

  &.md-size-2x {
    @include icon-size($icon-size * 2);
  }

  &.md-size-3x {
    @include icon-size($icon-size * 3);
  }

  &.md-size-4x {
    @include icon-size($icon-size * 4);
  }

  &.md-size-5x {
    @include icon-size($icon-size * 5);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

img.md-icon {
  user-select: none;
  -webkit-user-drag: none;
}

</style>