import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
const user = false;

const Home = () => {
  return (
    <>
      <div>{user ? <HomeScreen /> : <AuthScreen />}</div>
    </>
  );
};

export default Home;
