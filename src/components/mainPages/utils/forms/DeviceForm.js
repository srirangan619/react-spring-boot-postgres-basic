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
    mac_address: "",
    serial_number: ""
}

const initialStateTenant = {
    id: "",
    name: "",
    description: "",
    address: "",
    devices: []
}


function DeviceForm() {
    const state = useContext(GlobalState)
    const [device, setDevice] = useState(initialState)
    const [tenant, setTenant] = useState(initialStateTenant)
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState(0)

    const param = useParams()
    const [tenants] = state.tenantsManagerAPI.tenants
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

    const history = useHistory();

    useEffect(() => {
        
        if (param.id) {
            setOnEdit(true)
            tenants.forEach(tenant => {
                tenant.devices.forEach(device => {
                    if (device.id === Number(param.id)) {
                        setDevice(device)
                        setID(tenant.id)
                    }
                })
            })
        } else if (param.tid) {
            tenants.forEach(tenant => {
                if (tenant.id === Number(param.tid)) {
                    // console.log("tenant", tenant)
                    setTenant(tenant)

                    setID(tenant.id)
                }
            })

        } else {
            setOnEdit(false)
            setDevice(initialState)
        }
    }, [param, tenants])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setDevice({ ...device, [name]: value })
    }

    const handleSubmit =  async (e) => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`/device/${device.id}`, { device })
            } else {
                // console.log("before tenants", tenant)
                // console.log("devices", device)
                tenant.devices.push(device)
                // console.log("after tenants", tenant)
                await axios.put(`/tenant/${id}`, { tenant })
            }

            //console.log("sent successfull",tenant)
            setDevice(initialState)
            setCallBack(!callBack)

            history.push(`/detail/${id}`);

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
                        value={device.name} onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={device.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="mac_address">MAC Address</label>
                    <input type="text" name="mac_address" id="mac_address" required
                        value={device.mac_address} onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="serial_number">Serial Number</label>
                    <input type="text" name="serial_number" id="serial_number" required
                        value={device.serial_number} onChange={handleChangeInput} />
                </div>

                <div>
                    <Link to={`/detail/${id}`}>
                        <Button className="right" variant="outline-dark">{onEdit ? 'Cancel' : 'Back'}</Button>
                    </Link>
                    <Button className="right" variant="outline-success" type="submit">{onEdit ? 'Update' : 'Create'}</Button>
                </div>
            </form>
        </div>
    )
}

export default DeviceForm