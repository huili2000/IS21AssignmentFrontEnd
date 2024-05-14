import React from "react"
import { useState, useEffect } from 'react';
import { useTable } from 'react-table'
import './swimLanes.css';
import './users.css';
import AdminModal from "./adminModal";

const UserAdmin = (props) => {
    const [refresh, setRefresh] = useState(0);

    const [users, setUsers] = useState([])
    const [Permission, setPermission] = useState([])
    const [name, setName] = useState("")

    const [user, setUser] = useState({name: "", permission: ""})


    //call back end for Users
    useEffect(() => {
        fetch("https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/users", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify({email, password})
        })
            .then(r => r.json())
            .then(r => {
                if ('success' === r.message) {
                    //setInventory (r)
                    //localStorage.setItem("inventory", JSON.stringify({takeAwayNumber, token: r.token}))
                    //props.setLoggedIn(true)
                    //props.setEmail(email)
                    //navigate("/")
                } else {
                    setUsers(r)
                    //window.alert(JSON.stringify(localStorage.getItem("users")))
                }
            })
    }, [refresh])

    function onButtonClickDelete(name) {
        let url = "https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/users/" + user.name
        fetch(url, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(name)
        })
            .then(r => r.json())
            .then(r => {
                if ('success' === r.message) {
                    console.log("delete this user unsuccessfully: " + user.name);
                } else {
                    console.log("delete this user unsuccessfully: " + user.name)
                }
            })

        setRefresh(refresh + 1);
    }

    function onButtonClickUpdate(role, permission, password) {
        
        let url = "https://is21assignmentbe-ikc6zntdbq-wn.a.run.app/users/" + user.name
        fetch(url, {
            method: "Put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({role, permission, password})
        })
            .then(r => r.json())
            .then(r => {
                if ('success' === r.message) {
                    window.alert("delete this user successfully" + user.name)
                } else {
                    window.alert("delete this user unsuccessfully: " + user.name)
                }
            })

        setRefresh(refresh + 1);
        alert(user)
    }

    return (<div className={"mainContainer"}>
        <div className="title">Users Board</div>
        <div className="App">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Permission</th>
                    <th></th>
                </tr>
                {users.map((item, index) => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.permission}</td>
                        <td><input
                            className={"inputButton"}
                            type="button"
                            onClick={() => onButtonClickDelete(item.name)}
                            value={"Delete"} />
                        </td>
                    </tr>
                ))}
            </table>
            <div className={"inputButton"}>
                <input
                    type="button"
                    onClick={() => onButtonClickUpdate("painter", "view and Edit", "painter1")}
                    value={"Update Permission"} />
            </div>

            <div className={"inputContainer"}>
                <input
                    value={user.name}
                    placeholder="Enter your name"
                    onChange={ev => setName(ev.target.value)}
                    className={"inputBox"} />
                <input
                    value={user.permission}
                    placeholder="Enter your permission to be updated"
                    onChange={ev => setPermission(ev.target.value)}
                    className={"inputBox"} />
            </div>
            <AdminModal setUser={setUser}/>
            <div>
               
            </div>

        </div>
    </div>
    )
}

export default UserAdmin
