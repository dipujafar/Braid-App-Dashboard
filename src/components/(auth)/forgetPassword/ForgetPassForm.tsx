"use client";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { Error_Modal } from "@/utils/modals";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
};



const ForgetPassForm = () => {
  const route = useRouter();
  const [forgetPass, { isLoading }] = useForgetPasswordMutation();

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await forgetPass(values).unwrap();
      sessionStorage?.setItem("forgotPasswordToken", res?.data?.accessToken);
      route.push("/verify-email");
    } catch (error: any) {
      Error_Modal({ title: error?.data?.message });
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Button loading={isLoading} disabled={isLoading} htmlType="submit" size="large" block >
        Send OTP
      </Button>
    </Form>
  );
};

export default ForgetPassForm;
