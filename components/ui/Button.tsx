import { Pressable, Text, View, ViewStyle } from 'react-native';
import { useCallback, ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { RadialGradient } from 'react-native-gradients';
import React from 'react';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'newPrimary' | 'glass' | 'select' | 'purple-gradient' | 'dark-gradient';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  clickable?: boolean;
  className?: string;
  showArrow?: boolean;
  icon?: ReactNode;
  mainText?: string;
  subText?: string;
  selected?: boolean;
  isSelected?: boolean;
  style?: ViewStyle;
  alignment?: 'left' | 'center' | 'right';
}

export function Button({ 
  onPress, 
  title,
  children,
  variant = 'primary', 
  size = 'md',
  disabled = false,
  clickable = true,
  className = '',
  showArrow = false,
  icon,
  mainText,
  subText,
  selected = false,
  isSelected = false,
  style,
  alignment = 'center'
}: ButtonProps) {
  // Use isSelected if provided, otherwise fall back to selected
  const isButtonSelected = isSelected || selected;
  const handlePress = useCallback(() => {
    if (!disabled && clickable) {
      onPress();
    }
  }, [disabled, clickable, onPress]);

  // Common classes
  const baseClasses = `rounded-lg ${clickable ? 'active:opacity-80' : ''} flex-row justify-center items-center`;
  const disabledClasses = disabled ? 'opacity-50' : '';

  // Size specific classes
  const sizePaddingClasses = 
    size === 'sm' ? 'px-2 py-1' : 
    size === 'lg' ? 'px-6 py-3' : 
    'px-4 py-2';
  
  // Special padding for purple-gradient variant
  const purpleGradientPaddingClasses = 
    size === 'sm' ? 'px-2 py-3' : 
    size === 'lg' ? 'px-6 py-5' : 
    'px-4 py-4';
  const textSizeClasses = 
    size === 'sm' ? 'text-sm' : 
    size === 'lg' ? 'text-lg' : 
    'text-base';

  // Glass variant size classes
  const glassPaddingClasses =
    size === 'sm' ? 'p-2' :
    size === 'lg' ? 'p-4' :
    'p-3';
  
  const glassMainTextClasses =
    size === 'sm' ? 'text-sm' :
    size === 'lg' ? 'text-lg' :
    'text-base';
    
  const glassSubTextClasses =
    size === 'sm' ? 'text-xs' :
    size === 'lg' ? 'text-base' :
    'text-sm';

  const glassIconMarginClasses =
    size === 'sm' ? 'mr-2' :
    size === 'lg' ? 'mr-4' :
    'mr-3';

  // Icon size based on button size
  const iconSize = 
    size === 'sm' ? 16 :
    size === 'lg' ? 32 :
    24;

  // Clone the icon with the appropriate size if it's a valid React element
  const clonedIcon = icon && React.isValidElement(icon) 
    ? React.cloneElement(icon as React.ReactElement<any>, { size: iconSize })
    : icon;

  // Conditional rendering based on variant
  switch (variant) {
    case 'glass': {
      return (
        <Pressable 
          className={`overflow-hidden rounded-lg ${glassPaddingClasses} flex-row items-center flex-1 ${clickable ? 'active:opacity-70' : ''} ${disabledClasses} ${className}`}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
          style={[style, { borderRadius: 8 }]}
        >
          {/* Frosted Glass Background */}
          <BlurView
            intensity={30}
            tint="dark"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          
          {/* Semi-transparent overlay for additional glass effect */}
          <View 
            className="absolute top-0 left-0 right-0 bottom-0 bg-white/15 border border-white/25"
            style={{ borderRadius: 8 }}
          />
          
          {/* Content */}
          <View className={`flex-row items-center flex-1 z-10 ${
            alignment === 'left' ? 'justify-start' : 
            alignment === 'right' ? 'justify-end' : 
            'justify-center'
          }`}>
            {/* Left Icon */}
            {clonedIcon && (
              <View className={glassIconMarginClasses}>
                {clonedIcon}
              </View>
            )}
            
            {/* Text Content */}
            <View className={`${alignment === 'center' ? 'items-center' : alignment === 'right' ? 'items-end' : 'items-start'}`}>
              {mainText && (
                <Text className={`text-white font-semibold ${glassMainTextClasses} ${
                  alignment === 'center' ? 'text-center' : 
                  alignment === 'right' ? 'text-right' : 
                  'text-left'
                }`}>{mainText}</Text>
              )}
              {subText && (
                <Text className={`text-white/70 ${glassSubTextClasses} ${
                  alignment === 'center' ? 'text-center' : 
                  alignment === 'right' ? 'text-right' : 
                  'text-left'
                }`}>{subText}</Text>
              )}
              {title && !mainText && (
                <Text className={`text-white font-semibold ${glassMainTextClasses} ${
                  alignment === 'center' ? 'text-center' : 
                  alignment === 'right' ? 'text-right' : 
                  'text-left'
                }`}>{title}</Text>
              )}
            </View>
          </View>
        </Pressable>
      );
    }
    case 'select': {
      return (
        <Pressable 
          className={`overflow-hidden rounded-2xl ${glassPaddingClasses} flex-row items-center flex-1 ${clickable ? 'active:opacity-70' : ''} ${disabledClasses} ${className}`}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
          style={[style, { borderRadius: 16 }]}
        >
          {/* Frosted Glass Background */}
          <BlurView
            intensity={25}
            tint="dark"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          
          {/* Gradient Overlay - Only for selected state */}
          {isButtonSelected && (
            <LinearGradient
              colors={['rgba(64, 64, 64, 0.4)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.2)']}
              locations={[0, 0.5, 1]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 16,
              }}
            />
          )}
          
          {/* Glass overlay for unselected state */}
          {!isButtonSelected && (
            <View 
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{ borderRadius: 16 }}
            />
          )}
          
          {/* Border overlay */}
          <View 
            className={`absolute top-0 left-0 right-0 bottom-0 border ${
              isButtonSelected ? 'border-white/30' : 'border-white/15'
            }`}
            style={{ borderRadius: 16 }}
          />
          
          {/* Content */}
          <View className="flex-row items-center flex-1 z-10">
            {/* Selection Dot */}
            <View className={`w-6 h-6 rounded-full mr-4 items-center justify-center ${
              isButtonSelected ? 'bg-purple-500' : 'bg-white/20 border border-white/30'
            }`}>
              {isButtonSelected && (
                <View className="w-3 h-3 rounded-full bg-white" />
              )}
            </View>
            
            {/* Text Content */}
            <View className="flex-1">
              {mainText && (
                <Text className={`text-white font-semibold ${glassMainTextClasses} mb-1`}>{mainText}</Text>
              )}
              {subText && (
                <Text className={`text-white/70 ${glassSubTextClasses}`}>{subText}</Text>
              )}
              {title && !mainText && (
                <Text className={`text-white font-semibold ${glassMainTextClasses}`}>{title}</Text>
              )}
            </View>

            {/* Right Icon/Indicator - Removed checkmark */}
          </View>
        </Pressable>
      );
    }
    case 'purple-gradient': {
      const textClasses = `text-center font-bold text-white text-lg`;
      
      // Radial gradient color list for a strong, white-centered pink oval
      const radialGradientColorList = [
        { offset: '0%', color: '#FBB9F8', opacity: '1' }, // strong white center
        { offset: '30%', color: '#FAB1F0', opacity: '0.8' }, // pastel pink
        { offset: '60%', color: '#E9A8D3', opacity: '0.6' }, // soft pink
        { offset: '85%', color: '#EFBEDF', opacity: '0.1' } // fade out
      ];
      
      return (
        <Pressable 
          className={`${baseClasses} ${purpleGradientPaddingClasses} overflow-hidden ${disabledClasses} ${className}`}
          style={[{ borderRadius: 16 }, style]}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
        >
          {/* Main purple background - more muted */}
          <LinearGradient
            colors={['#7C3AED', '#6D28D9']} // More muted purple gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 16,
            }}
          />
          
          {/* Radial gradient at bottom - stays within button bounds */}
          <View style={{ 
            position: 'absolute', 
            bottom: -230, // Pushed down further
            left: 0,
            right: 0,
            alignItems: 'center', // Center horizontally
            zIndex: 2
          }}>
            <View style={{
              width: 500, // Wider oval
              height: 300, // Shorter height for oval
              borderRadius: 150, // More oval
            }}>
              {/* @ts-ignore */}
              <RadialGradient 
                x="50%" 
                y="50%" 
                rx="250" 
                ry="150" 
                colorList={radialGradientColorList}
              />
            </View>
          </View>
          
          {/* Content */}
          <View className="z-10 flex-row items-center justify-center">
            {icon && (
              <View className="mr-2">
                {clonedIcon}
              </View>
            )}
            {children ? children : title ? (
              <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''}`}>
                {title}
              </Text>
            ) : null}
            {showArrow && (
              <Text className={`${textClasses} text-lg`}>→</Text>
            )}
          </View>
        </Pressable>
      );
    }
    case 'dark-gradient': {
      const textClasses = `text-center font-bold text-white text-lg`;
      
      // Radial gradient color list for a strong, white-centered oval
      const radialGradientColorList = [
        { offset: '0%', color: '#FFFFFF', opacity: '1' }, // strong white center
        { offset: '30%', color: '#F8F8F8', opacity: '0.8' }, // light gray
        { offset: '70%', color: '#E5E5E5', opacity: '0.4' }, // soft gray
        { offset: '100%', color: '#D1D5DB', opacity: '0.05' } // fade out
      ];
      
      return (
        <Pressable 
          className={`${baseClasses} ${purpleGradientPaddingClasses} overflow-hidden ${disabledClasses} ${className}`}
          style={[{ borderRadius: 16 }, style]}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
        >
          {/* Main dark background - more black at top */}
          <LinearGradient
            colors={['#000000', '#1F1F1F', '#1F1F1F','#3D4045']} // Pure black to dark gray to gray gradient
            locations={[0, 0.3, 0.7, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 16,
            }}
          />
          
          {/* Radial gradient at bottom - stays within button bounds */}
          <View style={{ 
            position: 'absolute', 
            bottom: -250, // Pushed down further
            left: 0,
            right: 0,
            alignItems: 'center', // Center horizontally
            zIndex: 2
          }}>
            <View style={{
              width: 500, // Wider oval
              height: 300, // Shorter height for oval
              borderRadius: 150, // More oval
            }}>
              {/* @ts-ignore */}
              <RadialGradient 
                x="50%" 
                y="50%" 
                rx="250" 
                ry="150" 
                colorList={radialGradientColorList}
              />
            </View>
          </View>
          
          {/* Content */}
          <View className="z-10 flex-row items-center justify-center">
            {icon && (
              <View className="mr-2">
                {clonedIcon}
              </View>
            )}
            {children ? children : title ? (
              <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''}`}>
                {title}
              </Text>
            ) : null}
            {showArrow && (
              <Text className={`${textClasses} text-lg`}>→</Text>
            )}
          </View>
        </Pressable>
      );
    }
    case 'newPrimary': {
      const textClasses = `text-center font-bold text-black ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} border border-secondary-second ${disabledClasses} ${className}`}
          style={[style, { borderRadius: 8 }]}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
        >
          <LinearGradient
            colors={['#FFC862','#FFB833', '#FAAE21']} // primary:second to secondary:second gradient
            start={{ x: 1/2, y: 0 }}
            end={{ x: 1/2, y: 1 }}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderRadius: 8, // Match the Pressable's border radius
            }}
          />
          {children ? children : title ? (
            <Text className={`${textClasses} ${showArrow ? 'mr-2' : ''} z-10`}>
              {title}
            </Text>
          ) : null}
          {showArrow && (
            <Text className={`${textClasses} text-lg z-10`}>→</Text>
          )}
        </Pressable>
      );
    }
    case 'primary': {
      const textClasses = `text-center font-bold text-black ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} bg-primary ${disabledClasses} ${className}`}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
          style={[style, { borderRadius: 8 }]}
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
      const textClasses = `text-center font-bold text-white ${textSizeClasses}`;
      return (
        <Pressable 
          className={`${baseClasses} ${sizePaddingClasses} bg-secondary ${disabledClasses} ${className}`}
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
          style={[style, { borderRadius: 8 }]}
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
          onPress={clickable ? handlePress : undefined}
          disabled={disabled}
          style={[style, { borderRadius: 8 }]}
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
      const textClasses = `text-center font-medium text-primary ${textSizeClasses}`    }
  }
}
