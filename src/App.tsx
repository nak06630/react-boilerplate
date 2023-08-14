import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { Button } from '@mui/material'

import Todo from '@/components/experimental/Todo'
import SignIn2 from '@/components/experimental/SignIn'
import Forms from '@/components/experimental/Forms'
import LineChart from '@/components/experimental/LineChart'
import Map from '@/components/experimental/Map'
import Vis from '@/components/experimental/Vis'
import NotFound from '@/components/error/NotFound'
import SignIn from '@/components/SignIn'

interface Props {
  link: string
  to: string
}

const Button_link = ({ link, to, ...rest }: Props) => {
  return (
    <Button component={Link} to={to} {...rest}>
      {link}
    </Button>
  )
}

function Layout() {
  return (
    <div>
      <nav>
        <Button_link to="/" link="Home" />
        <Button_link to="/signin" link="signin" />
        <Button_link to="/signin2" link="signin2" />
        <Button_link to="/Forms" link="Forms" />
        <Button_link to="/todo" link="todo" />
        <Button_link to="/LineChart" link="LineChart" />
        <Button_link to="/Map" link="Map" />
        <Button_link to="/Vis" link="Vis" />
        <Button_link to="/404" link="404" />
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
