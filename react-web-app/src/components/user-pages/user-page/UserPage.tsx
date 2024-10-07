import { Outlet } from "react-router-dom";

export default function UserPage()
{
    return (
        <>
        <h1>User Page</h1>
        <Outlet />
        </>
    )
}