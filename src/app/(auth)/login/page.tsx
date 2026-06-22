"use client";

import { Suspense, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";
  const [resetMsg, setResetMsg] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setResetMsg("");
    if (!email) {
      setError("Entrez votre email ci-dessus, puis cliquez sur « Mot de passe oublié ».");
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch {
      // On n'expose pas si le compte existe (sécurité).
    } finally {
      setResetLoading(false);
      setResetMsg(
        "Si un compte existe pour cet email, un lien de réinitialisation vient d'être envoyé. Pensez à vérifier vos spams."
      );
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1) Firebase (nouveau fournisseur d'identité)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/auth/firebase-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (res.ok) {
        router.push(redirect);
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Accès non autorisé.");
      setLoading(false);
      return;
    } catch {
      // 2) Repli Supabase (transition — tant que Supabase reste actif)
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError) {
      setError(
        authError.message === "Invalid login credentials"
          ? "Email ou mot de passe incorrect"
          : authError.message
      );
      setLoading(false);
      return;
    }
    router.push(redirect);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <h1 className="text-3xl font-bold gradient-text">Afroboosteur</h1>
        </Link>
        <p className="text-gray-400 mt-2">Espace administration</p>
      </div>

      {/* Form */}
      <div className="bg-[#2a1a2a]/80 backdrop-blur-xl border border-[#8a2be2]/30 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center">
            <LogIn size={20} />
          </div>
          <h2 className="text-xl font-semibold">Connexion</h2>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none transition-colors"
                placeholder="Votre mot de passe"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {resetMsg && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-4 text-green-400 text-sm">
            {resetMsg}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleReset}
            disabled={resetLoading}
            className="text-sm text-[#ff00ff] hover:text-[#8a2be2] transition-colors disabled:opacity-50"
          >
            {resetLoading ? "Envoi..." : "Mot de passe oublié ?"}
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          Retour au site
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0a1a] via-[#2a1a2a] to-[#1a0a1a] px-4">
      <Suspense fallback={<div className="text-gray-400">Chargement...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
