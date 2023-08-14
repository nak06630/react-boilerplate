import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

import Todo from '@/components/experimental/Todo'
import SignIn2 from '@/components/experimental/SignIn'
import Forms from '@/components/experimental/Forms'
import LineChart from '@/components/experimental/LineChart'
import Map from '@/components/experimental/Map'
import Vis from '@/components/experimental/Vis'
import NotFound from '@/components/error/NotFound'
import SignIn from '@/components/SignIn'

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">signin</Link>
          </li>
          <li>
            <Link to="/signin2">signin2</Link>
          </li>
          <li>
            <Link to="/Forms">Forms</Link>
          </li>
          <li>
            <Link to="/todo">todo</Link>
          </li>
          <li>
            <Link to="/LineChart">LineChart</Link>
          </li>
          <li>
            <Link to="/Map">Map</Link>
          </li>
          <li>
            <Link to="/Vis">Vis</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signin2" element={<SignIn2 />} />
          <Route path="Forms" element={<Forms />} />
          <Route path="todo" element={<Todo />} />
          <Route path="LineChart" element={<LineChart />} />
          <Route path="Map" element={<Map />} />
          <Route path="Vis" element={<Vis />} />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
