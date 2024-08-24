import { useAuthStore } from "../../store/authUser.js";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const Home = () => {
  // const {user} =true
  const {user } = useAuthStore();
  
  return (
    <>
      <div>{user ? <HomeScreen /> : <AuthScreen />}
   
      </div>

    </>
  );
};

export default Home;
