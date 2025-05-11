import { View, ViewProps } from 'react-native';
import { ReactNode } from 'react';

/**
 * Container component props
 */
interface ContainerProps extends ViewProps {
  /** Child components */
  children: ReactNode;
  /** Additional Tailwind classes */
  className?: string;
}

/**
 * Container component
 * A flexible container with default padding and flex properties
 */
export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <View className={`flex-1 p-4 ${className}`} {...props}>
      {children}
    </View>
  );
} 