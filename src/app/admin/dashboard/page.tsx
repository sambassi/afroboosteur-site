"use client";

import { useEffect, useState } from "react";
import {
  FolderOpen,
  Landmark,
  FileText,
  Users,
  Calculator,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";

// Placeholder data — will be replaced with Supabase queries
const recentActivities = [
  {
    id: 1,
    type: "project",
    action: "Projet créé",
    title: "Festival Multiculturel 2026",
    time: "Il y a 2 heures",
    icon: FolderOpen,
    color: "text-[#8a2be2]",
  },
  {
    id: 2,
    type: "subsidy",
    action: "Subvention soumise",
    title: "Demande Ville de Neuchâtel",
    time: "Il y a 5 heures",
    icon: Landmark,
    color: "text-[#ff00ff]",
  },
  {
    id: 3,
    type: "document",
    action: "Document généré",
    title: "Budget prévisionnel Q2",
    time: "Hier",
    icon: FileText,
    color: "text-emerald-400",
  },
  {
    id: 4,
    type: "member",
    action: "Membre ajouté",
    title: "Marie Dupont — Coordinatrice",
    time: "Il y a 2 jours",
    icon: Users,
    color: "text-orange-400",
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "Dossier Canton de Neuchâtel",
    date: "25 mars 2026",
    status: "urgent" as const,
  },
  {
    id: 2,
    title: "Rapport annuel 2025",
    date: "31 mars 2026",
    status: "upcoming" as const,
  },
  {
    id: 3,
    title: "Demande Fondation Sandoz",
    date: "15 avril 2026",
    status: "normal" as const,
  },
];

const statusColors = {
  urgent: "bg-red-500/20 text-red-400 border-red-500/30",
  upcoming: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  normal: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-gray-400 mt-1">
          Vue d&apos;ensemble de l&apos;Association Afroboosteur
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Projets actifs"
          value={3}
          subtitle="2 en préparation"
          icon={FolderOpen}
          color="violet"
          trend={{ value: 50, label: "ce mois" }}
        />
        <MetricCard
          title="Subventions en cours"
          value={5}
          subtitle="CHF 45'000 demandés"
          icon={Landmark}
          color="fuchsia"
          trend={{ value: 20, label: "ce mois" }}
        />
        <MetricCard
          title="Budget total"
          value="CHF 12'500"
          subtitle="Exercice 2026"
          icon={Calculator}
          color="green"
        />
        <MetricCard
          title="Membres d'équipe"
          value={8}
          subtitle="3 rôles actifs"
          icon={Users}
          color="orange"
          trend={{ value: 12, label: "ce trimestre" }}
        />
      </div>

      {/* Two columns: Activities + Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Activité récente</h2>
            <button className="text-sm text-[#8a2be2] hover:text-[#ff00ff] transition-colors">
              Voir tout
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#8a2be2]/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a0a1a] border border-[#8a2be2]/20 flex items-center justify-center">
                  <activity.icon size={18} className={activity.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Échéances</h2>
            <Clock size={18} className="text-gray-500" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="p-3 rounded-xl border border-[#8a2be2]/10 hover:border-[#8a2be2]/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-white">
                    {deadline.title}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      statusColors[deadline.status]
                    }`}
                  >
                    {deadline.status === "urgent"
                      ? "Urgent"
                      : deadline.status === "upcoming"
                      ? "Bientôt"
                      : "Normal"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{deadline.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#2a1a2a]/50 backdrop-blur-sm border border-[#8a2be2]/20 rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Nouveau projet",
              icon: FolderOpen,
              href: "/admin/projects/new",
              gradient: "from-[#8a2be2] to-[#6a1fbd]",
            },
            {
              label: "Demande de subvention",
              icon: Landmark,
              href: "/admin/subsidies/new",
              gradient: "from-[#ff00ff] to-[#cc00cc]",
            },
            {
              label: "Générer un document",
              icon: FileText,
              href: "/admin/documents/new",
              gradient: "from-emerald-500 to-emerald-700",
            },
            {
              label: "Créer un budget",
              icon: Calculator,
              href: "/admin/budget/new",
              gradient: "from-orange-500 to-orange-700",
            },
          ].map((action) => (
            <button
              key={action.label}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${action.gradient} hover:opacity-90 transition-opacity`}
            >
              <action.icon size={24} />
              <span className="text-sm font-medium text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
