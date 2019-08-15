import React from "react";
import { reduxForm, Field } from "redux-form";

class StreamForm extends React.Component {

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ error, touched }) => {
    //este metodo solo se muestra el error si se toca dentro del componente
    if (touched && error) {
      console.log(error);
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  //recieve the values of the form
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Enter the title"
        />

        <Field
          name="description"
          component={this.renderInput}
          label="Enter the description"
        />

        <button type="submit" className="ui button primary">
          Submit
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
export default reduxForm({ form: "streamForm", validate })(StreamForm);
