<style lang="scss" src="./DataGrid.scss"></style>

<template>
  <div class="datagrid">
    <div v-if="checkbox">
      <input type="checkbox" id="checkbox" v-model="checked">
      Loading
    </div>
    <div
      class="datagrid__container"
    >
      <keep-alive>
        <table>
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.title"
              >
                <span
                  class="column-title"
                  v-text="column.title"
                />
              </th>
            </tr>
          </thead>
          <tbody v-if="isLoading || checked">
            <tr
              v-for="index in 3"
              :key="index"
              class="datagrid__row"
              :class="{
                'blend': blend,
                'vertical-animation': verticalAnimation,
                'horizontal-animation': horizontalAnimation
              }"
            >
              <td
                v-for="column in columns"
                :key="column.title"
              >
                <span>
                  <div
                    class="datagrid__loader"
                    :style="`width: ${Math.floor(Math.random() * 51) + 50}%;`"
                  />
                </span>
              </td>
            </tr>
          </tbody>
          <tbody
            v-else
            class="datagrid__shadow"
          >
            <tr
              v-for="item in rows"
              :key="item.id"
            >
              <td
                v-for="rowCell in item"
                :key="rowCell.keyValue"
              >
                <span
                  v-text="rowCell"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </keep-alive>
    </div>
  </div>
</template>

<script>

const columns = [
  {
    title: 'Name',
    value: 'name'
  },
  {
    title: 'Country',
    value: 'country'
  },
  {
    title: 'Song',
    value: 'song'
  }
]

const rowsSample = [
  {
    name: 'Florence + The Machine',
    country: 'England',
    song: 'What Kind of Man'
  }, {
    name: 'IZAL',
    country: 'Spain',
    song: 'La Increíble Historia del Hombre Que Podía Volar Pero No Sabía Cómo'
  }, {
    name: 'James Bay',
    country: 'England',
    song: 'Us'
  }, {
    name: 'Lana Del Rey',
    country: 'United States',
    song: 'Ride'
  }, {
    name: 'London Grammar',
    country: 'England',
    song: 'Wasting My Young Years'
  }, {
    name: 'Tom Odell',
    country: 'England',
    song: 'Another Love'
  }
]

export default {
  name: 'Datatable',

  props: {
    isLoading: {
      type: Boolean,
      default: true
    },
    blend: {
      type: Boolean,
      default: true
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    verticalAnimation: {
      type: Boolean,
      default: true
    },
    horizontalAnimation: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      rows: rowsSample,
      columns: columns,
      checked: ''
    }
  }
}
</script>
<style lang="scss">
@keyframes aniUISkeleton {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 100% 0;
  }
}

@keyframes aniVertical {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.datagrid {
  display: flex;
  flex-direction: column;
  flex: auto;
  width: 100%;
  overflow-x: auto;


  &.elevate-cover__img {
    background: #6C5CFF;
    align-items: center;
    justify-content: center;

    .datagrid__container {
      flex: initial;
      padding: 30px;
      width: 100%;
    }

    thead tr,
    tbody tr {
      color: white;
      grid-template-columns: 100px 100px auto;

      @media (min-width: $screen-sm){
        grid-template-columns: 200px 200px auto;
      }
    }
  }

  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;
    font: inherit;
    font-size: 100%;
  }

  table {
    flex: auto;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  ul {
    margin: 0;
  }

  thead {
    color: $grey-2;
  
    tr {
      display: grid;
      margin-bottom: 8px;
      grid-template-columns: 200px 200px minmax(200px, auto);

      th {
        padding: 0 16px;
        text-align: left;
        user-select: none;

        & > * {
          vertical-align: middle;
        }
      }
    }
  }

  tbody {
    display: block;
    position: relative;
    font-weight: 600;

    tr {
      display: grid;
      position: relative;
      align-items: center;
      margin-bottom: 1rem;
      box-shadow: 0 0 6.4px 4px #00000010;
      border-radius: 4px;
      background-color: white;
      grid-template-columns: 200px 200px minmax(200px, auto);

      &:last-child {
        margin-bottom: 0;
      }

      td {
        padding: 8px 16px;
        overflow: hidden;
        vertical-align: middle;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    * {
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

  &__loader {
    margin-bottom: 8px;
    border-radius: 8px;
    background: lighten(black, 85%);
    height: 12px;
  
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__shadow {
    &::before {
      position: absolute;
      top: 1%;
      left: 2%;
      box-shadow: 1px 5px 26px 12px #00000008;
      background-color: #00000008;
      width: calc(100% - 4%);
      height: calc(100% - 2%);
      content: "";
    }
  }

  &__row {
    position: relative;
    height: 48px;

    &.vertical-animation {
      animation: aniVertical 3s ease;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      opacity: 0;

      &:nth-child(2) {
        animation-delay: .5s;
      }
  
      &:nth-child(3) {
        animation-delay: 1s;
      }
    }

    &.horizontal-animation {
      &::before {
        position: absolute;
        animation-name: aniUISkeleton;
        animation-duration: 3.5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        background: linear-gradient(
          to right, lighten(black, 80%) 2%,
          lighten(black, 40%) 18%,
          lighten(black, 80%) 33%
        );
        background-size: 50%;
        width: 100%;
        height: 100%;
        content: "";
      }
    }

    
    &.blend {
      &::before {
        mix-blend-mode: overlay;
      }
    }
  }

  &__container {
    display: inline-flex;
    position: relative;
    flex: auto;
    padding: 4px;
    padding-bottom: 32px;
  }
}
</style>

