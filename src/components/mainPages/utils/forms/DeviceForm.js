import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState'

const initialState = {
    id: "",
    name: "",
    description: "",
    mac_address: "",
    serial_number: ""
}


function DeviceForm() {
    const state = useContext(GlobalState)
    const [device, setDevice] = useState(initialState)
    const [onEdit, setOnEdit] = useState(false)

    const param = useParams()
    const [tenants] = state.tenantsManagerAPI.tenants
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

    useEffect(() => {
        if (param.id) {
            setOnEdit(true)
            tenants.forEach(tenant => {
                tenant.Devices.forEach(device =>{
                    if (device.id === param.id) {
                        setDevice(device)
                    }
                })
            })
        } else {
            setOnEdit(false)
            setDevice(initialState)
        }
    }, [param.id, tenants])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setDevice({ ...device, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        try {
            if (onEdit) {
                // await axios.put(`api/tenants/${tenant.id}`, {...device})
            } else {
                // await axios.post('api/tenants', {...device})
            }

            //console.log("sent successfull",tenant)
            setDevice(initialState)
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

                <button type="submit">{onEdit? 'Update' : 'Add'}</button>
            </form>
        </div>
    )
}

export default DeviceForm