import ResetPassword from "@/components/auth/ResetPassword";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Next.js ForgotPassword Page | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
    return <ResetPassword />;
}