
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const AccountSettings = () => {
  const form = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Acme Inc.',
      phone: '+1 (555) 123-4567'
    }
  });

  const onSubmit = (data: any) => {
    console.log('Account data updated:', data);
    // Here you would update the user account data
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Account Settings</h2>
      <p className="text-gray-400">Manage your personal account information</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#131920] border-gray-700" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="bg-[#131920] border-gray-700" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#131920] border-gray-700" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-[#131920] border-gray-700" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 bg-thalos-blue hover:bg-blue-600">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountSettings;
