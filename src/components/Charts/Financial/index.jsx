import React, { useRef, useEffect } from 'react'
import * as echarts from 'echarts/core'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Register necessary ECharts components
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  CanvasRenderer
])

const formatCurrency = (value) => value.toLocaleString('en-US')

const MultiAxisChart = () => {
  const chartRef = useRef(null)

  const chartData = {
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    revenue: [
      138775000, 104550000, 111000000, 160700000, 241000000, 162300000,
      397400000, 552000000, 458600000, 474500000, 342350000, 623100000
    ],
    expenses: [
      23100000, 8500000, 20600000, 30100000, 31400000, 124500000, 50000000,
      33500000, 153000000, 12000000, 49039100, 250000000
    ]
  }

  useEffect(() => {
    if (!chartRef.current) return

    const chartInstance = echarts.init(chartRef.current)

    const revenue = chartData.revenue
    const expenses = chartData.expenses
    const profit = revenue.map((rev, idx) => rev - expenses[idx])

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Revenue', 'Expenses', 'Profit']
      },
      xAxis: [
        {
          type: 'category',
          data: chartData.months,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Money (IDR)',
          axisLabel: {
            formatter: '{value} IDR'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333'
            }
          }
        }
      ],
      series: [
        {
          name: 'Revenue',
          type: 'bar',
          data: revenue,
          tooltip: {
            valueFormatter: function (value) {
              return `${formatCurrency(value)} IDR`
            }
          },
          itemStyle: {
            color: '#5470C6'
          }
        },
        {
          name: 'Expenses',
          type: 'bar',
          data: expenses,
          tooltip: {
            valueFormatter: function (value) {
              return `${formatCurrency(value)} IDR`
            }
          },
          itemStyle: {
            color: '#EE6666'
          }
        },
        {
          name: 'Profit',
          type: 'line',
          data: profit,
          tooltip: {
            valueFormatter: function (value) {
              return `${formatCurrency(value)} IDR`
            }
          },
          lineStyle: {
            color: '#91CC75'
          },
          itemStyle: {
            color: '#91CC75' // Symbol color for Profit line
          },
          symbol: 'circle',
          symbolSize: 8
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
}

export default MultiAxisChart
