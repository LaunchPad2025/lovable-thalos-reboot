
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

type SearchFormValues = {
  query: string;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const form = useForm<SearchFormValues>({
    defaultValues: {
      query: '',
    },
  });

  const handleSubmit = (values: SearchFormValues) => {
    onSearch(values.query);
  };

  return (
    <div className="w-full mb-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      placeholder="Search for guides by keyword..." 
                      className="pl-9"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" variant="default">Search</Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBar;
