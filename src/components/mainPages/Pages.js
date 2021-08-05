import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './landing/Landing'
import NotFound from './utils/not_found/NotFound'
import TenantView from './utils/tenantView/TenantView'
import TenantForm from './utils/forms/TenantForm'
import DeviceForm from './utils/forms/DeviceForm'


function Pages() {
    return (
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/detail/:id" exact component={TenantView} />

            <Route path="/create_tenant" exact component={TenantForm} />
            <Route path="/tenant/:id" exact component={TenantForm} />

            <Route path="/create_device/:tid" exact component={DeviceForm} />
            <Route path="/device/:id" exact component={DeviceForm} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages