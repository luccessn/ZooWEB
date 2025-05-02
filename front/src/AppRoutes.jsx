import React from 'react'
import { Routes,Route } from 'react-router-dom'
import  RoutesConfig  from './Config/RoutesConfig'


const AppRoutes = () => {
  return <Routes>
    {RoutesConfig.map((route) =>{
        return(
            <Route key={route.path} path={route.path} Components={route.Components}/>
        )
    })
    }
  </Routes>
}

export default AppRoutes
