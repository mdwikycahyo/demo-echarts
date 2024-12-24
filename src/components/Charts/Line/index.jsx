import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { LineChart as LineChartEcharts } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register the components
echarts.use([
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  LineChartEcharts,
  CanvasRenderer
])

const LineChart = ({ chartData }) => {
  const { title, labels, data, smooth } = chartData
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const lineChartOption = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data.map((series) => series.name)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels
    },
    yAxis: {
      type: 'value'
    },
    series: data.map((series) => ({
      name: series.name,
      type: 'line',
      stack: 'Total', // Optional: Used to stack lines
      data: series.values,
      smooth
    }))
  }

  const setLineChart = () => {
    chartInstance.current.setOption(lineChartOption)
  }

  useEffect(() => {
    const chartDom = chartRef.current
    chartInstance.current = echarts.init(chartDom)

    // Initialize the chart
    setLineChart()

    // Use ResizeObserver for responsiveness
    const resizeObserver = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    })
    resizeObserver.observe(chartDom)

    // Cleanup on component unmount
    return () => {
      resizeObserver.disconnect()
      if (chartInstance.current) chartInstance.current.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={chartRef}
      className="h-[500px] w-full sm:h-[400px] md:h-[450px] lg:h-[500px]"
    />
  )
}

export default LineChart
