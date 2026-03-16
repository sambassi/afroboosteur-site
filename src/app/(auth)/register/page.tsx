"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (authError) {
      setError(
        authError.message === "User already registered"
          ? "Un compte existe déjà avec cet email"
          : authError.message
      );
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0a1a] via-[#2a1a2a] to-[#1a0a1a] px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#2a1a2a]/80 backdrop-blur-xl border border-[#8a2be2]/30 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center mx-auto mb-4">
              <Mail size={28} />
            </div>
            <h2 className="text-xl font-semibold mb-2">Vérifiez votre email</h2>
            <p className="text-gray-400 mb-6">
              Un email de confirmation a été envoyé à{" "}
              <span className="text-white font-medium">{email}</span>.
              Cliquez sur le lien pour activer votre compte.
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0a1a] via-[#2a1a2a] to-[#1a0a1a] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold gradient-text">Afroboosteur</h1>
          </Link>
          <p className="text-gray-400 mt-2">Créer un compte</p>
        </div>

        {/* Form */}
        <div className="bg-[#2a1a2a]/80 backdrop-blur-xl border border-[#8a2be2]/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] flex items-center justify-center">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-semibold">Inscription</h2>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Nom complet
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none transition-colors"
                  placeholder="Votre nom complet"
                  required
                />
              </div>
            </div>

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
                  placeholder="Minimum 8 caractères"
                  required
                  minLength={8}
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

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#1a0a1a] border border-[#8a2be2]/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#8a2be2] focus:outline-none transition-colors"
                  placeholder="Répétez le mot de passe"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#8a2be2] to-[#ff00ff] rounded-lg font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-[#ff00ff] hover:text-[#8a2be2] transition-colors"
            >
              Connexion
            </Link>
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
    </div>
  );
}
