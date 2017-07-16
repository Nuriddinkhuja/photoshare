import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { Field, reduxForm, propTypes } from 'redux-form';

@reduxForm({
  form: 'postForm',
  // validate: loginValidation
})

export default class PostForm extends Component {
  static propTypes = {
    ...propTypes
  }

  renderInput = ({ input, placeholder, type, meta: { touched, error } }) => {
    let errorText;
    if (error && touched) {
      errorText = error;
    } else {
      errorText = '';
    }

    return <Input {...input} type={type} placeholder={placeholder} error={!!errorText} />;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Field
            name="description"
            type="text"
            component={this.renderInput}
            placeholder="Tell about this post..."
          />
        </Form.Field>
        <Button type="submit" className="fluid teal">Submit</Button>
      </Form>
    );
  }
}

