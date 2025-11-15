"use client";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Error_Modal } from "@/utils/modals";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import LoadingSpin from "@/components/ui/loading-spin";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const formattedValues: Record<string, string> = {
        email: values.email as string,
        password: values.password as string,
      };
      const res = await login(formattedValues).unwrap();
      // @ts-ignore
      if (jwtDecode(res?.data?.accessToken)?.role !== "admin") {
        Error_Modal({ title: "You are not valid admin" });
        return;
      }
      // if(jwtDecode(res?.data?.accessToken)?.rp)



      dispatch(
        setUser({
          user: jwtDecode(res?.data?.accessToken),
          token: res?.data?.accessToken,
        })
      );
      toast.success("Login Success", { duration: 1000 });
      route.push("/dashboard");
    }
    catch (error: any) {
      console.log(error);
      Error_Modal({ title: error?.data?.message });
    }

  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      style={{ width: "354px" }}
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
        <Input size="large" type="email" placeholder="User Email" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item<FieldType> name="remember" valuePropName="checked">
        <Flex justify="space-between" align="center">
          <div></div>
          <Link href={"/forget-password"} style={{ textDecoration: "" }}>
            <p className="font-semibold text-[#091A72]">Forgot Password?</p>
          </Link>
        </Flex>
      </Form.Item>

      <Button disabled={isLoading} htmlType="submit" size="large" block >
        Sign In {isLoading && <LoadingSpin />}
      </Button>
    </Form>
  );
};

export default LoginForm;
