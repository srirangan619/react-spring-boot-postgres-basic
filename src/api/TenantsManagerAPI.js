import { useState, useEffect } from 'react'
import axios from 'axios'

// const data = [
//     {
//         id: 't1',
//         name: "tenant 1",
//         description: "Sample tenant",
//         address: "Sample tenant 1, 1234 Sample City",
//         Devices: [
//             {
//                 id: "d1",
//                 name: "Device 1",
//                 description: "Nice device",
//                 mac_address: "2C:54:91:88:C9:E3",
//                 serial_number: "4CE0460D0G"
//             },
//             {
//                 id: "d2",
//                 name: "Device 2",
//                 description: "Nice device",
//                 mac_address: "2C:54:91:88:C9:E3",
//                 serial_number: "4CE0460D0G"
//             }
//         ]
//     },
//     {
//         id: 't2',
//         name: "tenant 2",
//         description: "Sample tenant",
//         address: "Sample tenant 1, 1234 Sample City",
//         Devices: [
//             {
//                 id: "d1",
//                 name: "Device 1",
//                 description: "Nice device",
//                 mac_address: "2C:54:91:88:C9:E3",
//                 serial_number: "4CE0460D0G"
//             },
//             {
//                 id: "d2",
//                 name: "Device 2",
//                 description: "Nice device",
//                 mac_address: "2C:54:91:88:C9:E3",
//                 serial_number: "4CE0460D0G"
//             }
//         ]
//     }
// ]


function TenantsManagerAPI() {
    const [tenants, setTenants] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getTenants = async () => {
        const res = await axios.get('/getAll')
        //console.log("be",res.data)
 
        setTenants(res.data)
        //console.log("array",tenants)
    }

    useEffect(() => {
        getTenants()
        //console.log("back")
    }, [callBack])

    return {
        tenants: [tenants, setTenants],
        callBack : [callBack, setCallBack]
    }
}

export default TenantsManagerAPI