const Form = ({formHandler, handleUserName, handlePassword}) => {

    return (
        <>
            <form onSubmit={formHandler}>
            <input placeholder="Username" type="text" onChange={handleUserName} />
            <input placeholder="Pasword:" type="text" onChange={handlePassword} />
            </form>
        </>
    )
}
export default Form;