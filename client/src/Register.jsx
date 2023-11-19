import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

    async function handleSubmit(ev) {
        ev.preventDefault();
        // const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        const { data } = await axios.post('/register', { username, password });
        setLoggedInUsername(username);
        setId(data.id);
        console.log(data);
    }

    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text" placeholder="username"
                    className="block w-full rounded-sm p-2 mb-3 border" />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="password"
                    className="block w-full rounded-sm p-2 mb-3 border" />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
                    Register
                </button>
            </form>
        </div>
    );
}