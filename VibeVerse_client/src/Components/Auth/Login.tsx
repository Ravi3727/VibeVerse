import LoginForm from "./LoginForm.tsx";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex relative select-none">
      <div className="mx-auto my-auto z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
