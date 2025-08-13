import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <Header />
      <div className='w-full px-6 pt-32'>
        <Outlet />
      </div>
      <div className="mx-6 my-5">
        <Footer />
      </div>
      
    </div>
  )
}

export default App
