import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register the necessary ECharts components
echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
])

const PopulationChart = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    const chartDom = chartRef.current
    chartInstance.current = echarts.init(chartDom)

    // Define the raw data
    const rawData = {
      labels: [
        'Mengembangkan dan merekomendasikan kerangka kebijakan berdasarkan analisis trend yang muncul.',
        'Mengidentifikasi bagian-bagian dari suatu masalah yang kompleks dan membagi bagiannya menjadi detil serta melihat hubungan sebab akibatnya.',
        'Mengintegrasikan informasi dalam jumlah yang besar dari sumber yang bervariasi.',
        'Mengkombinasikan berbagai pendekatan analisis untuk dapat memahami permasalahan yang kompleks.',
        'Mengupas akar permasalahan secara detil dan menyeluruh dengan mempertimbangkan faktor-faktor yang terlibat di dalamnya.',
        'Merekomendasikan solusi yang layak dengan mempertimbangkan faktor-faktor lain yang terlibat dan implikasi hasil yang diinginkan.'
      ],
      data: [
        [50, 50], // Behaviour Showed, Behaviour Not Showed
        [70, 30],
        [40, 60],
        [90, 10],
        [10, 90],
        [20, 80]
      ]
    }

    // Convert raw data to percentages
    const percentageData = rawData.data.map((row) => {
      const total = row.reduce((sum, value) => sum + value, 0)
      return row.map((value) => (value / total) * 100)
    })

    // Define the base chart configuration
    const baseOption = {
      title: {
        text: 'Indicator Level 4',
        left: 'center',
        textStyle: {
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params) => {
          const category = params[0].axisValue
          const seriesData = params.map(
            (item) => `${item.seriesName}: ${item.data.toFixed(1)}%`
          )
          return `${category}<br/>${seriesData.join('<br/>')}`
        }
      },
      legend: {
        top: 30
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
          fontSize: 12,
          formatter: (value) => `${value}%` // Show percentage on x-axis
        }
      },
      yAxis: {
        type: 'category',
        data: rawData.labels,
        axisLabel: {
          rotate: 30,
          fontSize: 12,
          formatter: (value) =>
            value.length > 8 ? `${value.slice(0, 8)}...` : value
        }
      },
      series: [
        {
          name: 'Behaviour Showed',
          type: 'bar',
          barWidth: '30%',
          data: percentageData.map((row) => row[0]) // First column (Behaviour Showed)
        },
        {
          name: 'Behaviour Not Showed',
          type: 'bar',
          barWidth: '30%',
          data: percentageData.map((row) => row[1]) // Second column (Behaviour Not Showed)
        }
      ]
    }

    // Set initial chart options
    chartInstance.current.setOption(baseOption)

    // Handle resizing
    const resizeObserver = new ResizeObserver(() => {
      chartInstance.current.resize()
    })
    resizeObserver.observe(chartDom)

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      chartInstance.current.dispose()
    }
  }, [])

  return (
    <div
      ref={chartRef}
      className="h-[500px] w-full sm:h-[400px] md:h-[450px] lg:h-[500px]"
    />
  )
}

export default PopulationChart
