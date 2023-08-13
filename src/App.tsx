import Todo from '@/components/_example/Todo'
import SignIn from '@/components/_example/SignIn'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Outlet, Link } from 'react-router-dom'

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
            <Link to="/todo">todo</Link>
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

function NoMatch() {
  return <div></div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="todo" element={<Todo />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
