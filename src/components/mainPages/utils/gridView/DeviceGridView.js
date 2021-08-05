import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function DeviceGridView(props) {

    const deleteDevice = async() => {
        try {
            await axios.delete(`/api/tenants/${props.id}`)
            props.setCallBack(!props.callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <li>
            <h2>{props.name}</h2>
            <div>
                <p>{props.description}</p>
                <p>{props.mac_address}</p>
                <p>{props.serial_number}</p>
            </div>
            <Link to={`/detail/${props.id}`}>View</Link>
            <Link to={`/edit_tenant/${props.id}`}>Edit</Link>
            <Link to="#!" onClick={deleteDevice}>Delete</Link>
        </li>
    )

}

export default DeviceGridView