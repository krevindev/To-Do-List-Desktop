import './LoginPage.css';

const LoginPage = () => {

    const handleSubmit = e => {
        e.preventDefault();
        window.location = '/';
    }

    return (
        <div id="login-page" className="w-full h-full bg-baseColor flex justify-center items-center">
            <div className="w-[30%] h-1/2 bg-color2 rounded-lg flex flex-col items-center">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="text-black flex flex-col justify-center w-full h-full p-5 box-border">
                    <input className="login-input bg-[--color2] text-white border border-gray-500" type="text" placeholder='Username' />
                    <input className="login-input bg-[--color2] text-white border border-gray-500" type="password" placeholder='Password' />
                    <button className="login-input bg-green-400 flex items-center justify-center" type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;