import { Navigate } from 'react-router-dom';
import { useUser } from '../context/user-context';

const Private = (props) => {
    const {user, setUser} = useUser();
    return user ? <props.component /> : <Navigate to="/login" />
}

export default Private;