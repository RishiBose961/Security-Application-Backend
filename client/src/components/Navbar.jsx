import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlices";
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-black/75 text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Security</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                className="bg-white"
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${userInfo?.name}&flip=true`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-black/75 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">{userInfo?.name}</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <p onClick={logoutHandler}>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
