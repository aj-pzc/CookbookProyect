import { CommentsContainer, CommentsItem, FormContainer, FormItem, FromBtn, InputBox } from "./styles"

const FeedbackForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío aquí
    alert('Formulario enviado');
  };

  return (
    <FormContainer>
        <h3>
            Dejanos tus comentarios
        </h3>

        <form onSubmit={handleSubmit}>
        <CommentsContainer>
            <FormItem>
                <label htmlFor="formName">Nombre:</label>
                <InputBox type="text" id="formName" name="formName" placeholder="Ingresa Tu Nombre aqui" required/>
            </FormItem>
            <FormItem>
                <label htmlFor="formEmail">Correo:</label>
                <InputBox type="email" id="formEmail" name="formEmail" placeholder="Ingresa Tu Correo aqui" required/>
            </FormItem>
            <FormItem>
                <label htmlFor="formContact">Telefono:</label>
                <InputBox type="tel" id="formContact" name="formContact" placeholder="Ingresa Tu Telefono aqui"/>
            </FormItem>
            <CommentsItem>
                <label htmlFor="formFeedback">Comentarios y Sugerencias:</label>
                <InputBox as="textarea" style={ {width: '100%', height:'7rem'}} id="formFeedback" name="formFeedback" placeholder="Dejanos tus comentarios o sugerencias aqui" required/>
            </CommentsItem>
            <FormItem style={ {justifyContent:'flex-end'}}>
                <FromBtn type="submit">
                    Enviar
                </FromBtn>
            </FormItem>
        </CommentsContainer>
        </form>
    </FormContainer>      


)}

export default FeedbackForm;