import NineBox from './Charts/9-Box'
import DrilldownChart from './Charts/Bar'
import MultiAxisChart from './Charts/Financial'
import PopulationChart from './Charts/LongNameBar'
import ExpensesPieChart from './Charts/PieExpenses'
import DrilldownPieChart from './Charts/PieProfit'
import AnimatedTextChart from './Charts/ProfitText'

function App() {
  return (
    <div className="grid h-screen grid-cols-6 gap-2">
      {/* Sidebar */}
      <div className="col-span-1 flex flex-col border-r border-gray-300 bg-gray-100 p-4">
        <div className="mb-4">Dashboard</div>
      </div>

      {/* Main Content */}
      <div className="col-span-5">
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          Age Distribution
          <DrilldownChart />
        </div>
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          Long Bar Name Example
          <PopulationChart />
        </div>
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          Financial Report 2024
          <MultiAxisChart />
          Total Provit Report 2024
          <AnimatedTextChart />
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1">
              <DrilldownPieChart />
            </div>
            <div className="col-span-1">
              <ExpensesPieChart />
            </div>
          </div>
        </div>
        <div className="relative m-5 max-w-7xl rounded-lg border border-gray-300 bg-[#FEFEFE] p-4 sm:static sm:px-6 lg:px-8">
          9-Box
          <NineBox />
        </div>
      </div>
    </div>
  )
}

export default App
