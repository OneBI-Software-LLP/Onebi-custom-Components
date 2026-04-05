"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Settings, Shield, BarChart3, FileText, CreditCard, Bell } from "lucide-react";

const CodeBlock = ({ code }: { code: string }) => (
  <div className="mt-10 border-t border-slate-100 pt-8">
    <div className="flex items-center justify-between mb-4">
      <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
        Installation & Usage
      </Label>
      <Badge
        variant="outline"
        className="text-[10px] bg-slate-50 text-slate-500 font-mono tracking-widest border-slate-200"
      >
        npm i onebi-ui
      </Badge>
    </div>
    <pre className="p-5 rounded-2xl bg-[#0F172A] text-slate-50 overflow-x-auto text-[13px] font-mono shadow-inner leading-relaxed border border-slate-800">
      <code>{code}</code>
    </pre>
  </div>
);

export default function TabPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-12 lg:p-24">
      <div className="max-w-5xl mx-auto pb-24">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              Tab
            </h2>
            <p className="text-lg text-slate-500">
              Tabbed navigation for organizing content into switchable panels.
            </p>
          </div>
          <div className="grid gap-8 p-10 border border-slate-200 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50">
            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Default Tabs
              </Label>
              <Tabs defaultValue="account">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                    <h4 className="font-semibold text-slate-900">Account Settings</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john@onebi.io" />
                      </div>
                      <Button size="sm">Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="password">
                  <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                    <h4 className="font-semibold text-slate-900">Change Password</h4>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" placeholder="Enter current password" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" placeholder="Enter new password" />
                      </div>
                      <Button size="sm">Update Password</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="notifications">
                  <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                    <h4 className="font-semibold text-slate-900">Notification Preferences</h4>
                    <div className="space-y-3">
                      {["Email notifications", "Push notifications", "SMS alerts", "Weekly digest"].map((item) => (
                        <div key={item} className="flex items-center justify-between py-2">
                          <span className="text-sm text-slate-700">{item}</span>
                          <Button variant="outline" size="sm" className="h-7 text-xs">Enabled</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <Label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
                Settings Dashboard
              </Label>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="overview" className="gap-1.5">
                    <BarChart3 className="h-3.5 w-3.5" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="gap-1.5">
                    <CreditCard className="h-3.5 w-3.5" />
                    Billing
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="p-6 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-semibold text-slate-900">Activity Overview</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Total Views", value: "12,453", change: "+12%" },
                        { label: "Active Users", value: "1,234", change: "+5%" },
                        { label: "Conversions", value: "892", change: "+18%" },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-slate-50 rounded-lg p-4">
                          <p className="text-xs text-slate-500">{stat.label}</p>
                          <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-1 text-xs">{stat.change}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="profile">
                  <div className="p-6 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-semibold text-slate-900">Profile Information</h4>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                        JD
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">John Doe</p>
                        <p className="text-sm text-slate-500">Senior Developer</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label>First Name</Label>
                        <Input defaultValue="John" />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Last Name</Label>
                        <Input defaultValue="Doe" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="security">
                  <div className="p-6 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-semibold text-slate-900">Security Settings</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        { title: "Two-Factor Authentication", desc: "Add an extra layer of security", status: "Enabled", active: true },
                        { title: "Login Alerts", desc: "Get notified of new sign-ins", status: "Enabled", active: true },
                        { title: "Session Timeout", desc: "Auto-logout after inactivity", status: "30 min", active: false },
                      ].map((item) => (
                        <div key={item.title} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                          <Badge className={item.active ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-slate-100 text-slate-600 hover:bg-slate-100"}>
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="billing">
                  <div className="p-6 border border-slate-200 rounded-xl space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="h-5 w-5 text-indigo-600" />
                      <h4 className="font-semibold text-slate-900">Billing & Plans</h4>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/80">Current Plan</p>
                          <p className="text-xl font-bold">Pro Plan</p>
                          <p className="text-sm text-white/70 mt-1">$29/month</p>
                        </div>
                        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-9">
                          Upgrade
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-900">Payment Method</p>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <CreditCard className="h-5 w-5 text-slate-400" />
                        <span className="text-sm text-slate-600">**** **** **** 4242</span>
                        <span className="ml-auto text-xs text-slate-400">Exp 12/27</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <CodeBlock
              code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "onebi-ui";

export default function SettingsTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        {/* Account settings content */}
      </TabsContent>
      <TabsContent value="password">
        {/* Password change content */}
      </TabsContent>
      <TabsContent value="notifications">
        {/* Notification preferences */}
      </TabsContent>
    </Tabs>
  );
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
