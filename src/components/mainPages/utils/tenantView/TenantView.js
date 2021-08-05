import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../../GlobalState';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import axios from 'axios'


function TenantView() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [tenants] = state.tenantsManagerAPI.tenants
    const [detailTenant, setDetailTenant] = useState([])
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

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
    const deleteDevice = (e) => {
        try {
            // console.log("f",e.target.id);
            // console.log("s",e.currentTarget.id);
            axios.delete(`/device/${e.currentTarget.id}`)
            setCallBack(!callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    if (detailTenant.length === 0) return null;

    return (
        <Container>

            <div>
                <div className="spacing">
                    <h1>{detailTenant.name}</h1>
                    <p>{detailTenant.description}</p>
                    <p>{detailTenant.address}</p>
                </div>
                <div className="spacing">
                    <Link to={`/create_device/${detailTenant.id}`}>
                        <Button variant="success" size="lg">ADD DEVICE</Button>
                    </Link>
                </div>
                <div className="center">
                    {detailTenant.devices.length === 0 ? <div className="spacing">No Device Found</div> :
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Mac Address</th>
                                    <th>Serial Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detailTenant.devices.map(device =>
                                    (
                                        <tr key={device.id}>
                                            <td>{device.name}</td>
                                            <td>{device.description}</td>
                                            <td>{device.mac_address}</td>
                                            <td>{device.serial_number}</td>
                                            <td>
                                                {/* <span className="right"><Link to={`/detail/${device.id}`}><Button variant="primary">View</Button></Link></span> */}
                                                <span className="right"><Link to={`/device/${device.id}`}><Button variant="secondary">Edit</Button></Link></span>
                                                <span className="right"><Link to="" id={device.id} onClick={deleteDevice}><Button variant="danger">Delete</Button></Link></span>
                                            </td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </Table>
                    }
                </div>
                <Link to="/">
                    <Button variant="outline-dark">Back</Button>
                </Link>
            </div>
        </Container>

    );
}

export default TenantView