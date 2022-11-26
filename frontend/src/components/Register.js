import PageForm from "./PageForm";

function Register(props) {

  return (
    <PageForm
    onSubmit={props.onRegister}
    buttonText="Зарегистрироваться"
    title="Регистрация"
    isRegister={true}
    />
  )
}

export default Register