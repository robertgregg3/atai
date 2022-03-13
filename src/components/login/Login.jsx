import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { useStateValue } from '../../Context/StateProvider';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../images/thebes.png';
import ataiLogo from '../../images/atai2.svg';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState(true);
    const [{user}, dispatch] = useStateValue();
    const history = useHistory();
    
    const handleSignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let loggedInUser = userCredential;
            console.log('user: ', loggedInUser)
            dispatch({
                type: 'SET_USER',
                user: loggedInUser
            })
        })
    }
    
    const handleRegister = (e) => {
        e.preventDefault();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log('user: ', auth)
            auth.user.updateProfile({
                displayName: name,
            })
            dispatch({
                type: 'SET_USER',
                user: auth.user,
                displayName: name
            })
        })
        .catch(err => console.log(err))
        history.push('/');
    }

    const handleButtonClick = (value) => {
        setLogin(value)
      }

  return (
      <>
          <div className="login__container">
            <div className="login__left-side">
               <img alt="Thebes logo" src={logo} /> 
            </div>
            <div>
                <div className="login__options">
                    <button onClick={() => handleButtonClick(true)}>Login</button>
                    <button onClick={() => handleButtonClick(false)}>Create Account (DEMO Only)</button>
                </div>
                <div className="login__container-header">
                    <img alt="Atai Logo" src={ataiLogo} />
                </div>
                <form>
                    {!login && (
                        <>
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </>
                        )}
                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <div className="login__button-container">
                        {login 
                            ? (<button
                                type="submit"
                                onClick={handleSignIn}
                                >
                                Sign in
                            </button>)
                            : (
                                <button 
                                onClick={handleRegister} 
                                className="login__registerAccount">
                                Create ATAI Account
                                </button>
                            )}
                    </div>
                </form>
            </div>
          </div>
      </>
  )
}

export default Login