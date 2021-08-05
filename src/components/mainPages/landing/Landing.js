import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState'
import GridView from '../utils/gridView/GridView'
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'


function LandingPage() {
    const state = useContext(GlobalState)
    const [tenants] = state.tenantsManagerAPI.tenants
    const [callBack, setCallBack] = state.tenantsManagerAPI.callBack

    const deleteTenant = async () => {
        try {
            console.log("delete working")
            // await axios.delete(`/api/tenant/${props.id}`)
            setCallBack(!callBack)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div>
            <h1>Landing page</h1>
            <Link to="/create_tenant">
                <Button variant="success" size="lg">Add New Tenant</Button>
            </Link>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
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
                                        <span><Link to={`/detail/${tenant.id}`}><Button>View</Button></Link></span>
                                        <span><Link to={`/edit_tenant/${tenant.id}`}><Button>Edit</Button></Link></span>
                                        <span><Link to="#!" onClick={deleteTenant}><Button>Delete</Button></Link></span>
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default LandingPage