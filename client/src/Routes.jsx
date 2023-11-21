import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";
import RegisterAndLoginForm from "./RegisterAndLoginForm.jsx";
// import Chat from "./Chat";

export default function Routes() {
    const { username } = useContext(UserContext);

    if (username) {
        // return <Chat />;
        return "You are loggedin! as " + username;

    }

    return (
        <RegisterAndLoginForm />
    );
}