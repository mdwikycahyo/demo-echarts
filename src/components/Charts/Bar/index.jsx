import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  GraphicComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { BarChart as BarChartEcharts } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register the components
echarts.use([
  GridComponent,
  GraphicComponent,
  BarChartEcharts,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const BarChart = ({ chartData }) => {
  const { title, labels, data, orientation } = chartData
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const barChartOption = {
    title: {
      text: title
    },
    xAxis: {
      show: true,
      data: orientation === 'vertical' ? labels : null
    },
    yAxis: {
      show: true,
      data: orientation === 'horizontal' ? labels : null
    },
    dataGroupId: '',
    animationDurationUpdate: 500,
    series: {
      name: title,
      type: 'bar',
      id: 'ageDistribution',
      data,
      universalTransition: {
        enabled: true,
        divideShape: 'clone'
      }
    },
    tooltip: { trigger: 'item' }
  }

  const setBarChart = () => {
    chartInstance.current.setOption(barChartOption)
  }

  useEffect(() => {
    const chartDom = chartRef.current
    chartInstance.current = echarts.init(chartDom)

    // Initialize with bar chart
    setBarChart()

    // Use ResizeObserver to handle responsiveness
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

export default BarChart
