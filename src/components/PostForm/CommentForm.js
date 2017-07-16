import React, { Component } from 'react';
import { reduxForm, propTypes, Field } from 'redux-form';
import { Form, Input } from 'semantic-ui-react';

@reduxForm({
  form: 'commentForm',
  // validate: loginValidation
})

export default class CommentForm extends Component {
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
      <div>
        <Form onSubmit={handleSubmit} >
          <Form.Group>
            <Form.Field>
              <Field name="comment" type="text" component={this.renderInput} placeholder="comment..." />
            </Form.Field>
            <Form.Button type="submit" className="fluid" color="green" content="comment" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
