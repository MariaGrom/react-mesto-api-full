import PageForm from "./PageForm";

function Login (props) {
  return (
    <PageForm 
    onSubmit={props.onLogin}
    buttonText="Вход"
    title="Войти"
    isRegister={false}
    />
  )
}
export default Login