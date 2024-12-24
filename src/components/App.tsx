import BarChart from './Charts/Bar'
import LineChart from './Charts/Line'
import PieChart from './Charts/Pie'
import StackedBarChart from './Charts/StackedBar'

function App() {
  const barChartData = {
    title: 'Bar Chart Example',
    labels: ['Label 1', 'Label 2', 'Label 3'],
    data: [
      {
        groupId: 'Label 1',
        value: 30
      },
      {
        groupId: 'Label 2',
        value: 80
      },
      {
        groupId: 'Label 3',
        value: 35
      }
    ],
    orientation: 'vertical'
  }

  const lineChartData = {
    title: 'Line Chart',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [
      { name: 'Line 01', values: [120, 132, 101, 134, 90, 230, 210] },
      { name: 'Line 02', values: [220, 182, 191, 234, 290, 330, 310] },
      { name: 'Line 03', values: [150, 232, 201, 154, 190, 330, 410] },
      { name: 'Line 04', values: [320, 332, 301, 334, 390, 330, 320] },
      { name: 'Line 05', values: [820, 932, 901, 934, 1290, 1330, 1320] }
    ],
    smooth: true // Enable smooth curves
  }

  const pieChartData = {
    title: 'Pie Chart',
    data: [
      { value: 1048, name: 'Pie Area 01' },
      { value: 735, name: 'Pie Area 02' },
      { value: 580, name: 'Pie Area 03' },
      { value: 484, name: 'Pie Area 04' },
      { value: 300, name: 'Pie Area 05' }
    ]
  }

  const stackedBarChartData = {
    title: 'Stacked Bar Chart',
    labels: ['Group A'],
    series: [
      {
        name: 'Category 1',
        data: [100]
      },
      {
        name: 'Category 2',
        data: [36]
      },
      {
        name: 'Category 3',
        data: [12]
      }
    ]
  }

  return (
    <div className="grid h-screen grid-cols-6 gap-2">
      {/* Sidebar */}
      <div className="col-span-1 flex flex-col border-r border-gray-300 bg-gray-100 p-4">
        <div className="mb-4">Dashboard</div>
      </div>

      {/* Main Content */}
      <div className="col-span-5">
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          <BarChart chartData={barChartData} />
        </div>
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          <LineChart chartData={lineChartData} />
        </div>
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          <PieChart chartData={pieChartData} />
        </div>
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          <StackedBarChart chartData={stackedBarChartData} />
        </div>
      </div>
    </div>
  )
}

export default App
