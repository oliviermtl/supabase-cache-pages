import { createClient as supabase } from "./component";
import { SupabaseAuthError } from "../errors";

export const SupabaseSignUp = async (email: string, password: string) => {
  const { data, error } = await supabase().auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const SupabaseSignIn = async (email: string, password: string) => {
  const { data, error } = await supabase().auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const SupabaseSignOut = async () => {
  const res = await supabase().auth.signOut();
  if (res.error) SupabaseAuthError(res.error);
  return res;
};

export const SupabaseSignInWithGoogle = async () => {
  const res = await supabase().auth.signInWithOAuth({
    provider: "google",
  });
  return res;
};

export const SupabaseSignInWithMagicLink = async (email: string) => {
  const res = await supabase().auth.signInWithOtp({
    email: `${email}`,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback`,
    },
  });
  return res;
};

export const SupabaseUpdateEmail = async (email: string) => {
  const res = await supabase().auth.updateUser({ email });
  return res;
};

export const SupabaseUpdatePassword = async (password: string) => {
  const res = await supabase().auth.updateUser({ password });
  return res;
};

export const SupabaseResetPasswordEmail = async (email: string) => {
  const redirectTo = `${process.env.NEXT_PUBLIC_DOMAIN}/profile`;
  const res = await supabase().auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  return res;
};
