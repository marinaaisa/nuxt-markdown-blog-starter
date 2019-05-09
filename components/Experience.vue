<template lang="html">
  <li 
    class="experience__item"
    :class="{ 'experience__item--active': item.isActive, 'experience__item--video': item.video }"
  >
    <div class="experience__time-place">
      <div class="experience__place">
        {{ $t(`${type}.${item.id}.place`) }}
      </div>
      <div class="experience__time">
        <span v-if="!item.noStartingTime">{{ $t(`${type}.${item.id}.startingTime`) }}</span>
        <span :class="{ 'active': item.isActive }" v-if="!(type === 'events')"> - {{ $t(`${type}.${item.id}.finishTime`) }}</span>
      </div>
    </div>
    <div class="experience__image" :is="tag" :href="item.video">
      <svg v-if="item.video" viewBox="0 0 67 57" focusable="false" class="experience__image-video-logo">
        <g>
          <path fill="#FF0000" d="M63,14.87c-0.72-2.7-2.85-4.83-5.56-5.56C52.54,8,32.88,8,32.88,8S13.23,8,8.32,9.31
            c-2.7,0.72-4.83,2.85-5.56,5.56C1.45,19.77,1.45,30,1.45,30s0,10.23,1.31,15.13c0.72,2.7,2.85,4.83,5.56,5.56
            C13.23,52,32.88,52,32.88,52s19.66,0,24.56-1.31c2.7-0.72,4.83-2.85,5.56-5.56C64.31,40.23,64.31,30,64.31,30
            S64.31,19.77,63,14.87z"/>
          <polygon fill="#FFFFFF" points="26.6,39.43 42.93,30 26.6,20.57"/>
        </g>
      </svg>
      <ImageResponsive
        :imageURL="`${type}/${item.id}.${item.imgType || 'png'}`"
        :classes="'img-circle img-responsive'"
        :width="'79'"
        :height="'79'"
        :radius="true"
        :alt="$t(`${type}.alt`) + item.name" />
    </div>
    <div class="experience__panel">
      <div class="experience__position">
        <h4>{{ $t(`${type}.${item.id}.position`) }} —
        <a v-if="!item.noURL" target="_blank" :href="$t(`${type}.${item.id}.url`)" class="experience__company ani">
          <span>{{ $t(`${type}.${item.id}.name`) }}</span>
        </a>
          <span v-else >{{ $t(`${type}.${item.id}.name`) }}</span>
        </h4>
      </div>
      <div class="experience__description">
        <p>
          {{ $t(`${type}.${item.id}.description`) }}
          <span v-if="!(type === 'events')">
            <span v-if="item.isActive">{{ $t(`atTheMomentImLearning`) }} </span>
            <span v-else>{{ $t(`hereIlearnt`) }} </span>
            <span class="experience__learnt">{{ $t(`${type}.${item.id}.learnt`) }}</span>
          </span>
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    type: {
      type: String
    }
  },
  computed: {
    tag () {
      if (this.item.video) {
        return 'a'
      }
      return 'div'
    }
  }
}
</script>

<style lang="scss">
@keyframes stroke-draw {
  to{
    transform:rotate(180deg);
  }
}

.experience {
  position: relative;
  padding: 0;

  &__item {
    @media (min-width: $screen-sm){
      display: flex;
    }
  }

  &__content {
    vertical-align: middle;
    list-style: none;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 14rem;
      left: 21%;
      width: 2px;
      display: block;
      margin-left: -1.5px;
      display: none;
      background-color: $secondary-super-lighter;
      @media (min-width: $screen-sm){
        display: initial;
      }
      @media (min-width: $screen-md){
        bottom: 11rem;
      }
    }

    > li {
      position: relative;
      margin-bottom: 1rem;
      min-height: 5rem;

      &:before,&:after {
        content: " ";
        display: table;
      }

      &:after {
        clear: both;
      }
      @media (min-width: $screen-sm){
        margin-bottom: 5rem;
      }
    }
  }

  &__time-place {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
    
    @media (min-width: $screen-sm){
      margin-bottom: 0;
      display: block;
      width: 16.66667%;
    }
  }
  &__time {
    .active {
      color: $primary;
    }
  }

  &__panel {
    position: relative;
    padding: 0;
    margin-top: -5.5rem;
    text-align: left;

    @media (min-width: $screen-sm){
      padding: 0 0 0 2.7rem;
      margin-top: 0;
      width: 75%;
    }
  }
  &__image {
    position: relative;
    display: block;
    width: 16.66667%;
    height: 16.66667%;

    @media (min-width: $screen-sm){
      height: 8.33333%;
      width: 8.33333%;
    }

    &-video-logo {
      right: 0px;
      z-index: 10;
      position: absolute;
      top: -8px;
      height: 26px;
    }

    &:after {
      content: " ";
      display: block;
      position: absolute;
      top: -5px;
      left: -5px;
      height: calc(100% + 6px);
      border-radius: 100%;
      background: white;
      border: 2px solid $secondary-super-lighter;
      width: calc(100% + 6px);

      .experience__item--active & {
        border-color: $primary;
      }

      .experience__item--video & {
        border-color: red;
      }
    }

    .experience__item--video & {
      &:hover {
        &:after {
          border-style: dashed;
          animation: stroke-draw 6s linear infinite;
        }
      }
    }

    img {
      z-index: 1;
      position: relative;
      width: 100%;
      height: auto;
      margin-left: 0;
      text-align: center;
    }
  }
  &__position,
  &__place,
  &__studies {
    color: $secondary;
  }
  &__description {
    margin-top: 2rem;
    @media (min-width: $screen-sm){
      margin-top: 0;
    }
  }
  &__learnt {
    color: $secondary;
  }
  &__place,
  &__time {
    display: inline-block;
    @media (min-width: $screen-sm){
      display: block;
    }
  }
  &__position,
  &__studies {
    padding: .3rem 0 0 22%;
    min-height: 5rem;
    @media (min-width: $screen-sm){
      padding: 0;
      min-height: 0;
    }
  }
  }

</style>
