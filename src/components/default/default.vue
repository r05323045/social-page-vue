<template>
    <div class="default">
        <b-button variant="primary" to="/home">
            Get Started
        </b-button>
        <b-carousel
          id="carousel-fade"
          v-model="slide"
          fade
          no-hover-pause
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
          class="w-100"
        >
        <!-- Text slides with image -->
          <b-carousel-slide
            caption="Explore this amazing world."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum."
          >
            <template v-slot:img>
                <img
                    class="d-block img-fluid w-100"
                    style="filter:brightness(50%)"
                    src="https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/very_big_1/public/feature/images/active_social_life.jpg?itok=mwPHmREI"
                >
            </template>
          </b-carousel-slide>
            
          <b-carousel-slide
            caption="Make your life a better place."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum."
          >
            <template v-slot:img>
                <img
                    class="d-block img-fluid w-100"
                    style="filter:brightness(50%)"
                    src="https://99fm.com.na/wp-content/uploads/2019/02/Copy-of-SIBO-POSTS-7-1024x536.png"
                >
            </template>
          </b-carousel-slide>
          <b-carousel-slide
            caption="Build deeper connection with people."
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
              a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum."
          >
            <template v-slot:img>
                <img
                    class="d-block img-fluid w-100"
                    style="filter:brightness(50%)"
                    src="https://sarcoidosisnews.com/wp-content/uploads/2019/05/shutterstock_342492926-1000x480.jpg"
                >
            </template>
          </b-carousel-slide>
      </b-carousel>
    </div>
</template>
<script>
    import BScroll from "better-scroll"
    export default {
    data() {
      return {
        listScroll: {},
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
  }
</script>
<style>
    @import url('default.css');
</style>