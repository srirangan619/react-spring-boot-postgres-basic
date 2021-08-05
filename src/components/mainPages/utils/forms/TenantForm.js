import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState'
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

const initialState = {
    id: "",
    name: "",
    description: "",
    address: "",
    devices: []
}


function TenantForm() {
    const state = useContext(GlobalState)
    const [tenant, setTenant] = useState(initialState)
    const [onEdit, setOnEdit] = useState(false)

    const param = useParams()
    const [tenants] = state.tenantsManagerAPI.tenants
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

    const history = useHistory();

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            tenants.forEach(tenant => {
                if (tenant.id === Number(param.id)) {
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

    const handleSubmit =  async(e) => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`/tenant/${tenant.id}`, { tenant })
            } else {
                await axios.post('/create_tenant', { tenant })
            }

            //console.log("sent successfull",tenant)
            setTenant(initialState)
            setCallBack(!callBack)
            history.push("/");

        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    return (
        <div className="main-form">
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

                <div>
                    <Link to="/">
                        <Button className="right" variant="outline-dark">{onEdit ? 'Cancel' : 'Back'}</Button>
                    </Link>
                    <Button className="right" variant="outline-success" type="submit">{onEdit ? 'Update' : 'Create'}</Button>
                </div>
            </form>
        </div>
    )
}

export default TenantForm