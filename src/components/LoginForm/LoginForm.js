import React, { Component } from 'react';
import { reduxForm, propTypes, Field } from 'redux-form';
import { Form, Input, Button } from 'semantic-ui-react';
import loginValidation from './loginValidation';

@reduxForm({
  form: 'login',
  validate: loginValidation
})
export default class LoginForm extends Component {
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
    const { handleSubmit, error } = this.props;
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui white image header">
            <div className="content">
              Log-in to your account
            </div>
          </h2>
          {error && <p className="text-danger"><strong>{error}</strong></p>}
          <Form onSubmit={handleSubmit}>
            <div className="ui stacked segment">
              <Form.Field >
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <Field name="email" type="text" component={this.renderInput} placeholder="Email" />
                </div>
              </Form.Field>
              <Form.Field >
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <Field name="password" type="password" component={this.renderInput} placeholder="Password" />
                </div>
              </Form.Field>
              <Button type="submit" className="fluid teal">Submit</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
