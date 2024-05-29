import LoginForm from "./LoginForm.tsx";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex relative bg-black bg-opacity-1 select-none">
      <div className="mx-auto my-auto z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
