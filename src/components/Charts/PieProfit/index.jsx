import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register necessary components
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer])

const revenueSources = [
  { value: 1500000000, name: 'Product A' },
  { value: 1200000000, name: 'Product B' },
  { value: 900000000, name: 'Service C' },
  { value: 750000000, name: 'Other' }
]

const RevenuePieChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chartInstance = echarts.init(chartRef.current)

    // Calculate the total revenue
    const totalRevenue = revenueSources.reduce(
      (sum, source) => sum + source.value,
      0
    )

    const option = {
      title: {
        text: `Total Revenue\n\n${totalRevenue.toLocaleString('en-US')} IDR`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const formattedValue = params.value.toLocaleString('en-US')
          return `${params.name}: ${formattedValue} IDR (${params.percent}%)`
        }
      },
      series: [
        {
          name: 'Revenue Sources',
          type: 'pie',
          radius: '45%',
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%'
          },
          data: revenueSources
        }
      ]
    }

    chartInstance.setOption(option)

    const resizeObserver = new ResizeObserver(() => {
      chartInstance.resize()
    })
    resizeObserver.observe(chartRef.current)

    return () => {
      resizeObserver.disconnect()
      chartInstance.dispose()
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
}

export default RevenuePieChart
