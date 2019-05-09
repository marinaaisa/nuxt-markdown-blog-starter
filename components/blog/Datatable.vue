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
