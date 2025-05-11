import { View, ViewProps } from 'react-native';
import { ReactNode } from 'react';

interface CardProps extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
} 