import RegisterForm from "../components/Register/RegisterForm";
import RegisterDone from "../components/Register/RegisterDone";
import { Fragment } from "react";
import { useSelector } from "react-redux";
function RegisterPage() {
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  return (
    <Fragment>
      {isRegistered && <RegisterDone />}
      {!isRegistered && <RegisterForm />}
    </Fragment>
  );
}
export default RegisterPage;
