import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

function GridView(props) {

    const deleteTenant = async () => {
        try {
            console.log("delete working")
            // await axios.delete(`/api/tenant/${props.id}`)
            props.setCallBack(!props.callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        
        <li>
            <h2>{props.name}</h2>
            <h2>{props.id}</h2>
            <div>
                <p>{props.description}</p>
                <p>{props.deviceView ? props.mac_address : props.address}</p>
                <p>{props.deviceView ? props.serial_number : null}</p>
            </div>
            <Link to={`/detail/${props.id}`}>View</Link>
            <Link to={`/edit_tenant/${props.id}`}>Edit</Link>
            <Link to="#!" onClick={deleteTenant}>Delete</Link>
        </li>
    )

}

export default GridView