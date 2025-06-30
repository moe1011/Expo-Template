import React, { ReactNode } from 'react';
import { TextInput as RNTextInput, View, Text, Pressable, TextInputProps as RNTextInputProps, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Ionicons for visibility toggle

interface InputProps extends Omit<RNTextInputProps, 'className' | 'style'> {
  label?: string;
  className?: string; // For the wrapper view
  inputClassName?: string; // For the TextInput itself
  labelClassName?: string; // For the label
  error?: string;
  errorClassName?: string; // For the error message
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
  rightIcon?: ReactNode; // Additional right icon
  onRightIconPress?: () => void;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  // Validation states
  validationState?: 'idle' | 'checking' | 'success' | 'error';
  successMessage?: string;
  isLoading?: boolean;
  // Text input behavior
  autoCorrect?: boolean;
}

export function Input({
  label,
  className = '',
  inputClassName = '',
  labelClassName = '',
  error,
  errorClassName = '',
  icon,
  iconPosition = 'right',
  onIconPress,
  rightIcon,
  onRightIconPress,
  placeholder,
  onChangeText,
  validationState = 'idle',
  successMessage,
  isLoading = false,
  autoCorrect = false,
  ...rest
}: InputProps) {
  const baseInputStyle = "border rounded-lg text-black placeholder:text-gray-500 w-full"; 
  
  // Dynamic border styles based on validation state
  const getBorderStyle = () => {
    if (error || validationState === 'error') {
      return "border-red-500";
    }
    if (validationState === 'success') {
      return "border-green-500";
    }
    if (validationState === 'checking') {
      return "border-blue-500";
    }
    return "border-gray-300";
  };

  // Get the appropriate validation icon
  const getValidationIcon = () => {
    if (isLoading || validationState === 'checking') {
      return <ActivityIndicator size="small" color="#3B82F6" />;
    }
    if (validationState === 'success') {
      return <Ionicons name="checkmark-circle" size={20} color="#10B981" />;
    }
    if (error || validationState === 'error') {
      return <Ionicons name="close-circle" size={20} color="#EF4444" />;
    }
    return null;
  };

  const handleTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text.trim());
    }
  };

  const validationIcon = getValidationIcon();
  const hasValidationIcon = validationIcon !== null;
  const hasCustomIcon = icon !== null && icon !== undefined;
  const hasRightIcon = rightIcon !== null && rightIcon !== undefined;

  return (
    <View className={`w-full ${className}`}>
      {label && (
        <Text className={`text-base font-medium text-black mb-2 ${labelClassName}`}>
          {label}
        </Text>
      )}
      <View className={`relative flex-row items-center`}>
        {hasCustomIcon && iconPosition === 'left' && (
          <Pressable onPress={onIconPress} className="absolute left-3 z-10">
            {icon}
          </Pressable>
        )}
        <RNTextInput
          className={`${baseInputStyle} ${getBorderStyle()} ${
            hasCustomIcon && iconPosition === 'left' ? 'pl-10' : 'pl-3'
          } ${
            hasCustomIcon && iconPosition === 'right' ? 'pr-10' : 
            hasRightIcon ? 'pr-10' : 
            hasValidationIcon ? 'pr-10' : 'pr-3'
          } ${inputClassName}`}
          placeholder={placeholder}
          placeholderTextColor={"#9CA3AF"} // Equivalent to text-gray-500
          style={{
            textAlignVertical: 'center',
            includeFontPadding: false, // Android specific - removes extra font padding
            lineHeight: 20, // Consistent line height to prevent text jumping
            fontSize: 16, // Explicit font size for consistency
            paddingTop: 0, // Remove default top padding
            paddingBottom: 0, // Remove default bottom padding
            height: 48, // Explicit height to match h-12 (48px)
          }}
          onChangeText={handleTextChange}
          autoCorrect={autoCorrect}
          {...rest}
        />
        {/* Custom icon on the right */}
        {hasCustomIcon && iconPosition === 'right' && (
          <Pressable onPress={onIconPress} className="absolute right-3 z-10">
            {icon}
          </Pressable>
        )}
        {/* Right icon (separate from main icon) */}
        {hasRightIcon && (
          <Pressable onPress={onRightIconPress} className="absolute right-3 z-10">
            {rightIcon}
          </Pressable>
        )}
        {/* Validation icon (only show if no custom icon on the right and no right icon) */}
        {!hasCustomIcon && !hasRightIcon && hasValidationIcon && (
          <View className="absolute right-3 z-10">
            {validationIcon}
          </View>
        )}
      </View>
      {/* Error message */}
      {error && (
        <Text className={`text-sm text-red-500 mt-1 ${errorClassName}`}>
          {error}
        </Text>
      )}
      {/* Success message */}
      {!error && successMessage && validationState === 'success' && (
        <Text className={`text-sm text-green-600 mt-1`}>
          {successMessage}
        </Text>
      )}
    </View>
  );
} 