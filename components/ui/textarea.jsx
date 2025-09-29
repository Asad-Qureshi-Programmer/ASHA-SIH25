import React, { forwardRef } from "react";
import { TextInput } from "react-native";
import { cn } from "@/lib/utils"; // keep if you’re using NativeWind

const Textarea = forwardRef(
  ({ value, onChangeText, placeholder, editable = true, className }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        multiline
        numberOfLines={4}
        className={cn(
          "w-full min-h-[80px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black",
          className
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
