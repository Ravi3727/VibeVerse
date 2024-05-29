import { LuMusic2 } from "react-icons/lu";
import { FcMusic } from "react-icons/fc";
import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex relative bg-black bg-opacity-1 select-none">
      <div className="mx-auto my-auto z-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
