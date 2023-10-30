"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
//components
import LoginForm from "../login-form";

//icons


export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) return null;

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        setError("");

        const supabase = createClientComponentClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setError(error.message);
        }
        if (!error) {
            router.refresh();
            router.push("/dashboard");
        }
    };
    [];

    const signInWithGoogle = async () => {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `${location.origin}/api/auth/callback`,
            },

        });
        if (error) {
            setError(error.message);
        }
        if (!error && data) {
            router.push("/");
        }

    };[];



    return (
        <>
            <div className="login-bg -z-50"></div >
            <div className="h-[calc(100vh-70px)] w-full flex items-center justify-center z-50">
                <div className="w-25 p-12 bg-dark/95 rounded-xl">
                    <div className="w-full flex justify-center">
                        <button className="flex items-center gap-3 text-white border-2 border-white rounded-xl" onClick={signInWithGoogle}>Log In with google</button>
                    </div>
                    <div className="border-b-4 border-slate-50 py-4"></div>
                    <p className="text-center py-8 text-white text-base">or log in with your email below</p>
                    <LoginForm handleSubmit={handleSubmit} />
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </>
    );
}
