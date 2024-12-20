import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  GraphicComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { BarChart, PieChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// Register the components
echarts.use([
  GridComponent,
  GraphicComponent,
  BarChart,
  CanvasRenderer,
  UniversalTransition,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const LongNameBar = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const barChartOption = {
    xAxis: {
      show: true,
      data: ['20-39', '40-55', '> 55']
    },
    yAxis: {
      show: true
    },
    dataGroupId: '',
    animationDurationUpdate: 500,
    series: {
      name: 'Age Group',
      type: 'bar',
      id: 'ageDistribution',
      data: [
        { value: 25, groupId: '20-39' },
        { value: 20, groupId: '40-55' },
        { value: 12, groupId: '> 55' }
      ],
      universalTransition: {
        enabled: true,
        divideShape: 'clone'
      }
    },
    tooltip: { trigger: 'item' },
    graphic: [
      {
        type: 'text',
        left: 50,
        top: 20,
        style: {
          text: 'Click bar for more information',
          fontSize: 18
        }
      }
    ]
  }

  const drilldownData = [
    {
      dataGroupId: '20-39',
      data: [
        { value: 10, name: 'Male' },
        { value: 15, name: 'Female' }
      ]
    },
    {
      dataGroupId: '40-55',
      data: [
        { value: 15, name: 'Male' },
        { value: 5, name: 'Female' }
      ]
    },
    {
      dataGroupId: '> 55',
      data: [
        { value: 5, name: 'Male' },
        { value: 7, name: 'Female' }
      ]
    }
  ]

  const setBarChart = () => {
    chartInstance.current.setOption(barChartOption)
  }

  const setPieChart = (groupId) => {
    const subData = drilldownData.find((data) => data.dataGroupId === groupId)
    if (!subData) return

    chartInstance.current.setOption({
      xAxis: { show: false },
      yAxis: { show: false },
      series: [
        {
          name: 'Gender',
          type: 'pie',
          radius: '50%',
          data: subData.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      tooltip: { trigger: 'item' },
      graphic: [
        {
          type: 'text',
          left: 50,
          top: 20,
          style: {
            text: 'Back',
            fontSize: 18
          },
          onclick: setBarChart
        }
      ]
    })
  }

  useEffect(() => {
    const chartDom = chartRef.current
    chartInstance.current = echarts.init(chartDom)

    // Initialize with bar chart
    setBarChart()

    // Handle click events
    chartInstance.current.on('click', (event) => {
      if (event.data && event.data.groupId) {
        setPieChart(event.data.groupId)
      }
    })

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

export default LongNameBar
