import React, { ChangeEvent, Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { inject, observer } from "mobx-react";
import "./Login.css";
import { AuthStore } from "../../store/auth";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

interface LoginProps {
  authStore: AuthStore;
}

@inject("authStore")
@observer
class Login extends Component<LoginProps> {
  onFinish = () => {
    this.props.authStore.login().then(res => console.log(res));
  };

  onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.authStore.setEmail(e.target.value);
  };

  onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.authStore.setPassword(e.target.value);
  };

  render() {
    const { errors, loading, isLoggedIn } = this.props.authStore;

    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="paper">
        <Form
          {...layout}
          className="login-form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email ? "error" : undefined}
            help={errors.email || undefined}
            required
          >
            <Input onChange={this.onEmailChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            validateStatus={errors.password ? "error" : undefined}
            help={errors.password || undefined}
            required
          >
            <Input.Password onChange={this.onPasswordChange} />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
