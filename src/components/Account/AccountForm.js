import React, { Component } from 'react';
import { reduxForm, propTypes, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import accountValidation from './AccountValidation';

@reduxForm({
  form: 'account',
  validate: accountValidation,
  enableReinitialize: true
})
@connect(
  state => ({
    initialValues: state.accountForm.data,
    updating: state.auth.updating
  })
)
export default class AccountForm extends Component {
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
    const { handleSubmit, error, updating } = this.props;

    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          {error && <p className="text-danger"><strong>{error}</strong></p>}
          <Form loading={updating} onSubmit={handleSubmit}>
            <Form.Field>
              <Field name="email" type="text" component={this.renderInput} placeholder="Email" />
            </Form.Field>
            <Form.Field>
              <Field name="firstName" type="text" component={this.renderInput} placeholder="First Name" />
            </Form.Field>
            <Form.Field>
              <Field name="lastName" type="text" component={this.renderInput} placeholder="Last Name" />
            </Form.Field>
            <Form.Field>
              <Field name="password" type="password" component={this.renderInput} placeholder="Password" />
            </Form.Field>
            <Form.Field>
              <Field
                name="password_confirmation"
                type="password" component={this.renderInput}
                placeholder="Confirm password" />
            </Form.Field>
            <Button type="submit" className="fluid teal">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}
