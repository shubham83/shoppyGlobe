import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
return (
    <>
  {/* Wrap the app with Redux store provider to enable global state management */}
      <Provider store={store}>
         {/* Header shown on all pages */}
        <Header />
        {/* Render the matched child route component here */}
        <Outlet />
      </Provider>
     
      {/* Footer shown on all pages */}
      <Footer />
    </>
  )
}

export default App
