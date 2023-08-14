import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { Button } from '@mui/material'

import SignIn2 from '@/components_experimental/SignIn'
import Forms from '@/components_experimental/Forms'
import LineChart from '@/components_experimental/LineChart'
import Map from '@/components_experimental/Map'
import Vis from '@/components_experimental/Vis'
import SampleRactTable from '@/components_experimental/SampleRactTable'

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

function Main() {
  return <div>ログインしました。</div>
}

function Layout() {
  return (
    <div>
      <nav>
        <Button_link to="/" link="Main" />
        <Button_link to="/experimental/" link="Experimental" />
      </nav>
      <hr />
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}

function ExperimentalLayout() {
  return (
    <div>
      <nav>
        <Button_link to="/" link="Main" />
        <Button_link to="/experimental/signin2" link="signin2" />
        <Button_link to="/experimental/forms" link="Forms" />
        <Button_link to="/experimental/todo" link="todo" />
        <Button_link to="/experimental/linechart" link="LineChart" />
        <Button_link to="/experimental/map" link="Map" />
        <Button_link to="/experimental/vis" link="Vis" />
        <Button_link to="/experimental/table" link="RactTable" />
        <Button_link to="/experimental/404" link="404" />
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
          <Route path="/" element={<SignIn />} />
          <Route path="/main/" element={<Main />} />
        </Route>
        <Route path="/experimental" element={<ExperimentalLayout />}>
          <Route path="signin2" element={<SignIn2 />} />
          <Route path="forms" element={<Forms />} />
          <Route path="linechart" element={<LineChart />} />
          <Route path="map" element={<Map />} />
          <Route path="vis" element={<Vis />} />
          <Route path="table" element={<SampleRactTable />} />
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
