"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


//icons
import { BiLogoGoogle } from 'react-icons/bi'

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) return null;

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
            <div className="h-[calc(100vh)] bg-indigo-100 w-full flex items-center justify-center">
                <div className="w-25 p-12 bg-indigo-500/95 rounded-xl shadow-md hover:scale-105 ease-in-out">
                    <div className="w-full flex flex-col items-center justify-center">
                        <h1 className="text-5xl text-white font-black pb-4">Todo-App</h1>
                        <button className="flex items-center gap-3 text-white border-2 border-white p-4 rounded-xl" onClick={signInWithGoogle}><BiLogoGoogle size={32} />Sign Up or Log In with google</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </>
    );
}
