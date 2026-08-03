"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCheck, FiX, FiArrowRight } from "react-icons/fi";
import { authService } from "@/services/auth.service";

export default function VerifyEmailPage() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data } = await authService.verifyEmail(token);

        setSuccess(true);
        setMessage(data.message);
      } catch (error) {
        setSuccess(false);

        setMessage(error.response?.data?.message || "Verification failed.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying your email...
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-8 border border-primary/20 flex items-center justify-center">
          {success ?
            <FiCheck className="text-green-600 text-4xl" />
          : <FiX className="text-red-600 text-4xl" />}
        </div>

        <h1 className="text-3xl font-bold mb-4">
          {success ? "Email Verified" : "Verification Failed"}
        </h1>

        <p className="mb-8">{message}</p>

        <Link
          href="/login"
          className="bg-accent text-secondary font-semibold px-8 py-4 inline-flex items-center gap-2"
        >
          Continue to Login
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
