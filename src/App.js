import React from "react"
import { BrowserRouter, Switch } from "react-router-dom"
import Loading from "./components/Loading/Loading.js"
import CommonRoute from "./routes/CommonRoute.jsx"
import PrivateRoute from "./routes/PrivateRoute.jsx"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "./store/actions/auth.js"
import { getAllEvents } from "./store/actions/events.js"
import { getTypes } from "./store/actions/events"
import { getAllUsers } from "./store/actions/auth"

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.googleLogin.token)
  const success = useSelector(state => state.auth.get.success)
  const loading = useSelector(state => state.auth.get.loading)
  const loginSuccess = useSelector(s => s.auth.login.success)
  const typesLoading = useSelector(s => s.events.getAllTypes.loading)
  const eventsLoading = useSelector(s => s.events.getAllEvents.loading)
  const eventLoading = useSelector(s => s.events.eventState.loading)
  const getUserStateLoading = useSelector(s => s.events.getUserState.loading)

  React.useEffect(() => {
    if (
      window.localStorage.getItem("token") ||
      window.localStorage.getItem("google") ||
      token ||
      loginSuccess
    ) {
      dispatch(
        getUserInfo(
          window.localStorage.getItem("token") ||
            window.localStorage.getItem("google")
        )
      )
    }
  }, [
    window.localStorage.getItem("token"),
    window.localStorage.getItem("google"),
    token,
    loginSuccess,
  ])

  React.useEffect(() => {
    dispatch(getAllEvents())
    dispatch(getTypes())
    dispatch(getAllUsers())
  }, [])
  const showLoader =
    getUserStateLoading ||
    loading ||
    typesLoading ||
    eventLoading ||
    eventsLoading
  return (
    <BrowserRouter>
      {showLoader && <Loading />}
      <Switch>{success ? <PrivateRoute /> : <CommonRoute />}</Switch>
    </BrowserRouter>
  )
}

export default App
