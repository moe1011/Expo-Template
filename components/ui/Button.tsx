import { Pressable, Text, View } from 'react-native';
import { useCallback, ReactNode } from 'react';

/**
 * Button component props
 */
interface ButtonProps {
  /** Function to call when button is pressed */
  onPress: () => void;
  /** Button text (alternative to children) */
  title?: string;
  /** Custom button content */
  children?: ReactNode;
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional Tailwind classes */
  className?: string;
  /** Show arrow icon on the right */
  showArrow?: boolean;
}

/**
 * Button component with multiple variants and sizes
 */
export function Button({ 
  onPress, 
  title,
  children,
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  showArrow = false
}: ButtonProps) {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress();
    }
  }, [disabled, onPress]);

  // Common classes
  const baseClasses = `rounded-lg active:opacity-80 flex-row justify-center items-center`;
  const disabledClasses = disabled ? 'opacity-50' : '';

  // Size specific classes
  const sizePaddingClasses = 
    size === 'sm' ? 'px-2 py-1' : 
    size === 'lg' ? 'px-6 py-3' : 
    'px-4 py-2';
  const textSizeClasses = 
    size === 'sm' ? 'text-sm' : 
    size === 'lg' ? 'text-lg' : 
    'text-base';

  // Conditional rendering based on variant
  switch (variant) {
    case 'primary': {
      const textClasses = `text-center font-bold text-white ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} bg-primary ${disabledClasses} ${className}`}
          onPress={handlePress}
          disabled={disabled}
        >
          {children ? children : title ? (
            <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''}`}>
              {title}
            </Text>
          ) : null}
          {showArrow && (
            <Text className={`${textClasses} text-lg`}>→</Text>
          )}
        </Pressable>
      );
    }
    case 'secondary': {
      const textClasses = `text-center font-bold text-primary ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} bg-secondary ${disabledClasses} ${className}`}
          onPress={handlePress}
          disabled={disabled}
        >
          {children ? children : title ? (
            <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''}`}>
              {title}
            </Text>
          ) : null}
          {showArrow && (
            <Text className={`${textClasses} text-lg`}>→</Text>
          )}
        </Pressable>
      );
    }
    case 'outline': {
      const textClasses = `text-center font-medium text-primary ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} bg-transparent border border-primary ${disabledClasses} ${className}`}
          onPress={handlePress}
          disabled={disabled}
        >
          {children ? children : title ? (
            <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''}`}>
              {title}
            </Text>
          ) : null}
          {showArrow && (
            <Text className={`${textClasses} text-lg`}>→</Text>
          )}
        </Pressable>
      );
    }
    case 'ghost':
    default: {
      const textClasses = `text-center font-medium text-primary ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} bg-transparent ${disabledClasses} ${className}`}
          onPress={handlePress}
          disabled={disabled}
        >
          {children ? children : title ? (
            <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''}`}>
              {title}
            </Text>
          ) : null}
          {showArrow && (
            <Text className={`${textClasses} text-lg`}>→</Text>
          )}
        </Pressable>
      );
    }
  }
} 