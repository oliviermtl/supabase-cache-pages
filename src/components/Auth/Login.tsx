import { SupabaseSignIn, SupabaseSignUp } from "@/lib/supabase/auth";
import {
  Button,
  Stack,
  TextInput,
  Title,
  PasswordInput,
  Alert,
  Anchor,
} from "@mantine/core";
import { AuthError } from "@supabase/supabase-js";
import { IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "@mantine/form";

export default function Login() {
  const router = useRouter();
  const [errorLogin, setErrorLogin] = useState<AuthError | null>(null);
  const [step, setStep] = useState(0);

  async function logIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const { data, error } = await SupabaseSignUp(email, password);
    console.log(error);
    // If user is already registered
    if (error?.status === 422) {
      const { data: dataSignin, error: errorSignIn } = await SupabaseSignIn(
        email,
        password
      );
      if (errorSignIn) setErrorLogin(errorSignIn);
    } else {
      if (error) setErrorLogin(error);
    }
  }

  const title = [
    "Sign in or create an account",
    "Welcome back!",
    "Finish creating your account",
  ][step];

  const buttonText = ["Continue", "Sign in", "Create an account"][step];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 2 ? "Password is too short" : null),
    },
  });

  return (
    <main>
      <form onSubmit={form.onSubmit((values) => logIn(values))}>
        <Stack>
          <Title order={1} size="h4">
            {title}
          </Title>
          <TextInput
            label="Email address"
            id="email"
            type="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label={"Password"}
            id="password"
            type="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />{" "}
          <Anchor href="https://mantine.dev/" target="_blank">
            Forgotten your password?
          </Anchor>
          <Button type="submit">{buttonText}</Button>
          {errorLogin && (
            <Alert
              title="Incorrect sign in details. Please try again."
              variant="light"
              color="red"
              icon={<IconInfoCircle />}
            >
              {/* {JSON.stringify(errorLogin, 0, 1)} */}
            </Alert>
          )}
        </Stack>
      </form>
    </main>
  );
}

// Different errors from supabase
// AuthApiError: User already registered
// AuthApiError: Invalid login credentials
