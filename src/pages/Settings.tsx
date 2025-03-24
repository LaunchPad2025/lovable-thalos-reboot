
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContainer from "@/components/layout/PageContainer";
import PageTitle from "@/components/ui/PageTitle";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <PageContainer>
      <PageTitle
        title="Settings"
        subtitle="Manage your account settings and preferences."
      />

      <div className="mt-6">
        <Tabs
          defaultValue="account"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notification">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-6">
            <AccountSettings />
          </TabsContent>
          <TabsContent value="security" className="pt-6">
            <SecuritySettings />
          </TabsContent>
          <TabsContent value="notification" className="pt-6">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="appearance" className="pt-6">
            <AppearanceSettings />
          </TabsContent>
          <TabsContent value="subscription" className="pt-6">
            <SubscriptionSettings />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Settings;
