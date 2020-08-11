import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { auth, fetchProfile } from '../../api';

export default class Unauthed extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, message: false};
  }

  login = async (data) => {
    const {accountAuth, accountProfile} = this.props;
    this.setState({
      loading: true, message: false
    });
    let resp = data && await auth(data);
    const token = resp && resp.ok && resp.token;
    this.setState({
      loading: false, message: !token && (resp.message || 'Unknown Error')
    });
    if (!token)
      return;
    accountAuth(token);
    resp = token && await fetchProfile(token);
    resp && resp.ok && resp.data && accountProfile(resp.data);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const fields = e.target.elements;
    if (!fields)
      return;
    let data = {}, b = false;
    for (let field of fields) {
      if (!field.name) continue;
      data[field.name] = field.value;
      b = true;
    }
    b && this.login(data);
  }

  render () {
    const { loading, message } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading} error={Boolean(message)}>
          <Form.Input
            name="username" required
            fluid icon='user' iconPosition='left' placeholder='Username'
          />
          <Form.Input
            name="password" type='password' required
            fluid icon='lock' iconPosition='left' placeholder='Password'
          />
          <Form.Button type="submit" fluid color='blue'>Log in</Form.Button>
          {message && <Message error size='small' content={message} />}
      </Form>
    );
  }
}
