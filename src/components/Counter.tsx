import React, { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { PopoverTrigger, PopoverContent, Popover } from '~/components/ui/popover';
import { Input } from '~/components/ui/input';
import { Card, CardTitle } from '~/components/ui/card';
import { useDebounce } from '~/lib/useDebounce'; // Make sure to import useDebounce

// Define a type for the props
type CounterComponentProps = {
  title?: string;
  onUpdate?: (newCount: number, text: string) => void;
};

export default function CounterComponent({
  title = 'Hi',
  onUpdate,
}: CounterComponentProps) {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('0');
  
  // Use debounced version of count
  const debouncedCount = useDebounce<number>(count, 1000); // 1 second delay

  // Effect that calls the onUpdate function with the debounced count
  useEffect(() => {
    if (onUpdate) {
      onUpdate(debouncedCount, title); // Only call onUpdate with the debounced value
    }
  }, [debouncedCount, onUpdate, title]);

  // Handlers for increment and decrement that update the local state
  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      return newCount;
    });
  };

  // Handler for when the "Update" button in the popover is clicked
  const handleUpdateClick = () => {
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue)) {
      setCount(newValue); // Update the local state count
    }
  };

  return (
    <Card className="flex flex-col items-center space-y-4 p-8 sm:p-12 w-full max-w-xs h-fit">
      <CardTitle>{title}</CardTitle>
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={handleDecrement}>-</Button>
        <h2 className="text-2xl">{count}</h2>
        <Button variant="outline" onClick={handleIncrement}>+</Button>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Edit Value</Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4">
          <h3 className="text-lg font-semibold mb-2">Edit Counter Value</h3>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Enter new value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="submit" onClick={handleUpdateClick}>Update</Button>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
}
