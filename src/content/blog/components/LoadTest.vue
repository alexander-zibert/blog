<script setup lang="ts">
import { ref, onMounted } from "vue";

import * as echarts from "echarts/core";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import type {
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DataZoomComponentOption,
} from "echarts/components";

import { ScatterChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts";

type ECOption = ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
>;

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  ScatterChart,
  SVGRenderer,
  UniversalTransition,
  LineChart,
]);

const throughputChart = ref();

onMounted(() => {
  var myChart = echarts.init(throughputChart.value);

  let now = 0.0;

  let data = [];
  for (let i = 1; i < 100; i++) {
    data.push([now, 0.01]);
    now += 1;
  }
  const option: ECOption = {
    title: {
      left: "center",
      text: "Wait Time",
    },
    toolbox: {
      feature: {
        restore: {},
      },
    },
    xAxis: { name: "Request Id" },
    yAxis: { name: "Wait Time [s]" },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        type: "line",
        data: data,
      },
    ],
  };

  myChart.setOption(option);
});
</script>
<template>
  <div ref="throughputChart" style="width: 100%; height: 200px"></div>
</template>
