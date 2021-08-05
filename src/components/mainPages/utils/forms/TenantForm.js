import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState'

const initialState = {
    id: "",
    name: "",
    description: "",
    address: "",
    Devices: []
}


function TenantForm() {
    const state = useContext(GlobalState)
    const [tenant, setTenant] = useState(initialState)
    const [onEdit, setOnEdit] = useState(false)

    const param = useParams()
    const [tenants] = state.tenantsManagerAPI.tenants
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            tenants.forEach(tenant => {
                if (tenant.id === param.id) {
                    setTenant(tenant)
                }
            })
        } else {
            setOnEdit(false)
            setTenant(initialState)
        }
    }, [param.id, tenants])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setTenant({ ...tenant, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        try {
            if (onEdit) {
                // await axios.put(`/tenants/${tenant.id}`, {...tenant})
            } else {
                // await axios.post('/tenants', {...tenant})
            }

            //console.log("sent successfull",tenant)
            setTenant(initialState)
            setCallBack(!callBack)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required
                        value={tenant.name} onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={tenant.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" required
                        value={tenant.address} onChange={handleChangeInput} />
                </div>

                <button type="submit">{onEdit? 'Update' : 'Create'}</button>
            </form>
        </div>
    )
}

export default TenantForm