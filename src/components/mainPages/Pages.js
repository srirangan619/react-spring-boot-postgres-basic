import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPage from './landing/Landing'
import NotFound from './utils/not_found/NotFound'
import TenantView from './utils/tenantView/TenantView'
import TenantForm from './utils/forms/TenantForm'


function Pages() {
    return (
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/detail/:id" exact component={TenantView} />

            <Route path="/create_tenant" exact component={TenantForm} />
            <Route path="/edit_tenant/:id" exact component={TenantForm} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages