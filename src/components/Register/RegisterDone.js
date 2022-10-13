import classes from "./RegisterDone.module.scss";
const RegisterDone = () => {
  return (
    <>
      <div className={classes["register__noti__wrap"]}>
        <p className={classes["register__noti__title"]}>
          Your account is registered successfully! Just login to get started
        </p>
      </div>
    </>
  );
};
export default RegisterDone;
