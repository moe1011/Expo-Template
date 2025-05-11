import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';
import { getTextStyle } from '../../utils/fonts';

/**
 * Extended text component props
 */
interface TextProps extends RNTextProps {
  /** Type of text component */
  type?: 'header' | 'paragraph';
  /** Additional style properties */
  style?: TextStyle;
  /** Text content */
  children: React.ReactNode;
}

/**
 * Base Text component
 * Uses different font styles based on the type
 */
export function Text({ type = 'paragraph', style, children, ...props }: TextProps) {
  const fontStyle = getTextStyle(type);
  
  return (
    <RNText style={[fontStyle, style]} {...props}>
      {children}
    </RNText>
  );
}

/**
 * Header component for titles and headings
 */
export function Header({ style, children, ...props }: Omit<TextProps, 'type'>) {
  return (
    <Text type="header" style={style} {...props}>
      {children}
    </Text>
  );
}

/**
 * Paragraph component for body text
 * Uses system default font
 */
export function Paragraph({ style, children, ...props }: Omit<TextProps, 'type'>) {
  return (
    <Text type="paragraph" style={style} {...props}>
      {children}
    </Text>
  );
} 