import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  LegendComponent,
  GraphicComponent
} from 'echarts/components'
import { PieChart as PieChartEcharts } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register the components
echarts.use([
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  PieChartEcharts,
  CanvasRenderer
])

const PieChart = ({ chartData }) => {
  const { title, data } = chartData
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const pieChartOption = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      top: 'bottom'
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        startAngle: 210,
        endAngle: 330,
        data: data,
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%', // Show percentage inside the pie
          fontSize: 12
        }
      }
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: `${(
          (data.reduce((sum, item) => sum + item.value, 0) /
            data.reduce((sum, item) => sum + item.value, 0)) *
          100
        ).toFixed(0)}%`,
        fontSize: 40,
        fontWeight: 'bold'
      }
    }
  }

  const setPieChart = () => {
    chartInstance.current.setOption(pieChartOption)
  }

  useEffect(() => {
    const chartDom = chartRef.current
    chartInstance.current = echarts.init(chartDom)

    // Initialize the chart
    setPieChart()

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

export default PieChart
