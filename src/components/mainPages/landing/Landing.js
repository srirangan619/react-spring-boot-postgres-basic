import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import './landing.css';
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'


function LandingPage() {
    const state = useContext(GlobalState)
    const [tenants] = state.tenantsManagerAPI.tenants
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

    const deleteTenant = async (e) =>{
        try {
            // console.log("f",e.target.id);
            // console.log("s",e.currentTarget.id);
            await axios.delete(`/tenant/${e.currentTarget.id}`)
            setCallBack(!callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <Container>
            <h1>Welcome</h1>
            <div className="spacing">
            <Link to="/create_tenant">
                <Button variant="success" size="lg">ADD NEW TENANT</Button>
            </Link>
            </div>
            
            <div className="center">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tenants.map(tenant =>
                            (
                                <tr key={tenant.id}>
                                    <td>{tenant.name}</td>
                                    <td>{tenant.description}</td>
                                    <td>{tenant.address}</td>
                                    <td>
                                        <span className="right"><Link to={`/detail/${tenant.id}`}><Button variant="primary">View</Button></Link></span>
                                        <span className="right"><Link to={`/tenant/${tenant.id}`}><Button variant="secondary">Edit</Button></Link></span>
                                        <span className="right"><Link to="" id={tenant.id} onClick={deleteTenant}><Button variant="danger">Delete</Button></Link></span>
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default LandingPage