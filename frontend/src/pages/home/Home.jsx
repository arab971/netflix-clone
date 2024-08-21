import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
const user = true;

const Home = () => {
  return (
    <>
      <div>{user ? <HomeScreen /> : <AuthScreen />}</div>
    </>
  );
};

export default Home;
