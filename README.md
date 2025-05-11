# Expo Template

A clean, modern, and customizable Expo template built with:
- Expo Router for navigation
- NativeWind v4 (Tailwind CSS) for styling
- Reusable UI components
- TypeScript support

## Features

- 📱 **Modern UI Components**: Ready-to-use buttons, text components, and layouts
- 🎨 **NativeWind v4**: Use Tailwind CSS classes directly in your React Native components
- 📁 **File-based Routing**: Expo Router for simple navigation
- 🔄 **State Management**: Zustand for global state management
- 🚀 **TypeScript**: Full TypeScript support
- 📊 **Data Fetching**: TanStack Query integration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [Bun](https://bun.sh/) (recommended) or npm/yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone this template:

```bash
# If using npx
npx create-expo-app my-app --template <template-url-or-name>

# Or clone directly
git clone https://github.com/your-username/expo-template.git my-app
cd my-app
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Start the development server:

```bash
bun run start
# or
npm run start
```

## Project Structure

```
expo-template/
├── app/               # Screens using Expo Router file-based routing
│   ├── (auth)/        # Authentication screens
│   ├── (tabs)/        # Main tab screens
│   └── index.tsx      # Landing/entry screen
├── assets/            # Static assets (images, fonts)
├── components/        # React components
│   ├── features/      # Feature-specific components
│   ├── layout/        # Layout components
│   └── ui/            # Base UI components
├── hooks/             # React hooks
│   └── api/           # API-related hooks
├── stores/            # Zustand stores
└── utils/             # Helper functions
```

## Customization

### Changing Colors

Edit the `tailwind.config.js` file to customize the color palette:

```js
colors: {
  primary: {
    DEFAULT: '#3B82F6' // Change to your primary brand color
  },
  secondary: {
    DEFAULT: '#1F2937' // Change to your secondary brand color
  },
  // ...other colors
}
```

### Adding Components

Create new components in the appropriate directory:
- `/components/ui/` - Base UI components
- `/components/layout/` - Layout components
- `/components/features/` - Feature-specific components

### Adding Screens

Create new screens in the `/app` directory:
- For a new tab screen: `/app/(tabs)/new-screen.tsx`
- For a new auth screen: `/app/(auth)/new-screen.tsx`
- For other screens: `/app/new-screen.tsx`

## Built-in Components

### Button

```tsx
<Button
  title="Continue"
  variant="primary" // 'primary', 'secondary', 'outline', 'ghost'
  size="lg" // 'sm', 'md', 'lg'
  showArrow={true}
  onPress={() => {}}
/>
```

### Text Components

```tsx
<Header className="text-3xl font-bold">Title</Header>
<Paragraph className="text-base text-gray-600">Body text</Paragraph>
```

### Container

```tsx
<Container className="justify-center items-center p-4">
  {/* Content */}
</Container>
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [NativeWind](https://nativewind.dev/)
- [Expo Router](https://expo.github.io/router/)
