import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';


function TenantView() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [tenants] = state.tenantsManagerAPI.tenants
    const [detailTenant, setDetailTenant] = useState([])

    useEffect(() => {
        if (params.id) {
            tenants.forEach(tenant => {

                if (tenant.id === Number(params.id)) {
                    setDetailTenant(tenant)
                    // console.log("in",detailTenant)
                }
            });
        }

    }, [params.id, tenants])

    // console.log("out",detailTenant)

    if (detailTenant.length === 0) return null;

    return (
        <div>
            <div>
                <h1>{detailTenant.name}</h1>
                <p>{detailTenant.description}</p>
                <p>{detailTenant.address}</p>
            </div>
            <div></div>
        </div>

    );
}

export default TenantView