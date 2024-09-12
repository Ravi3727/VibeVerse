import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex relative bg-white bg-opacity-1 select-none">
      <div className="mx-auto my-auto z-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
