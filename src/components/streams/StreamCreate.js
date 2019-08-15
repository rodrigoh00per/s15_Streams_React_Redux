import React from "react";

import { createStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  //recieve the values of the form
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <div className="">
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

/* const formWrapped = reduxForm({ form: "streamCreate", validate })(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapped); */

export default connect(
  null,
  { createStream }
)(StreamCreate);
