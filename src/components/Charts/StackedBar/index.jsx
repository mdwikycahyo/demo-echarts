import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { BarChart as BarChartEcharts } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register the components
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BarChartEcharts,
  CanvasRenderer
])

const StackedBarChart = ({ chartData }) => {
  const { title, labels, series } = chartData
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const stackedBarChartOption = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        // Calculate total for each axis point
        const total = params.reduce((sum, item) => sum + item.value, 0)
        return params
          .map((item) => {
            const percentage = total
              ? ((item.value / total) * 100).toFixed(1)
              : 0
            return `${item.marker} ${item.seriesName}: ${item.value} (${percentage}%)`
          })
          .join('<br/>')
      }
    },
    legend: {
      top: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      type: 'category',
      data: labels,
      show: false
    },
    series: series.map((s) => ({
      name: s.name,
      type: 'bar',
      stack: 'total',
      emphasis: {
        focus: 'series'
      },
      label: {
        show: true,
        position: 'inside',
        formatter: (params) => {
          const total = series
            .map((s) => s.data[params.dataIndex])
            .reduce((sum, val) => sum + val, 0)
          const percentage = ((params.value / total) * 100).toFixed(1)
          return `${percentage}%`
        }
      },
      data: s.data
    }))
  }

  const setStackedBarChart = () => {
    chartInstance.current.setOption(stackedBarChartOption)
  }

  useEffect(() => {
    const chartDom = chartRef.current
    chartInstance.current = echarts.init(chartDom)

    // Initialize the chart
    setStackedBarChart()

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

  return <div ref={chartRef} className="h-[150px] w-full" />
}

export default StackedBarChart
