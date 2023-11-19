import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import Register from "./Register.jsx";
// import Chat from "./Chat";

export default function Routes() {
    const { username } = useContext(UserContext);

    if (username) {
        // return <Chat />;
        return "You are loggedin!"

    }

    return (
        <Register />
    );
}