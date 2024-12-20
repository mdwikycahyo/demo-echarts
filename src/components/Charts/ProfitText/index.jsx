import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const AnimatedTextChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Initialize chart
    const chartDom = chartRef.current
    const myChart = echarts.init(chartDom)

    // Define the option
    const option = {
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: '4.000.000.000 IDR',
              fontSize: 60,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#000',
              lineWidth: 1
            },
            keyframeAnimation: {
              duration: 3000,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 50,
                    lineDash: [200, 0]
                  }
                },
                {
                  percent: 0.8,
                  style: {
                    fill: 'transparent'
                  }
                },
                {
                  percent: 1,
                  style: {
                    fill: 'black'
                  }
                }
              ]
            }
          }
        ]
      }
    }

    // Set chart options
    myChart.setOption(option)

    // Resize chart on window resize
    const resizeObserver = new ResizeObserver(() => {
      myChart.resize()
    })
    resizeObserver.observe(chartDom)

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      myChart.dispose()
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '200px' }} />
}

export default AnimatedTextChart
