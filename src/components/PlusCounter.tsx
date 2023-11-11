import { Button } from "~/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogClose,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "~/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  counterName: z.string().min(2).max(50),
  category: z.string().min(1),
});
export default function PlusConter() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      counterName: "",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-24 w-24 text-2xl font-bold" variant="outline">
          +
        </Button>
      </DialogTrigger>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
            <FormField
              control={form.control}
              name="counterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Counter Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="4">Reading</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          <DialogFooter className="flex flex-col space-y-2">
            <DialogClose className="border-2 px-2 rounded-lg hover:bg-gray-200 h-10">
              Cancel
            </DialogClose>
                <Button className="bg-blue-400 hover:bg-blue-200" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
          </DialogFooter>
        </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
