# Brand Tokens

This repository uses **Style Dictionary** to generate **CSS variables** that are dynamically used in a **Brand Provider** component to apply the correct branding across applications.

### Features

- Uses Style Dictionary to generate brand-specific CSS variables.
- Stores brand tokens as JSON files inside `src/tokens/`.
- Dynamically applies the correct branding using the `BrandProvider` component.
- Supports multiple brands with separate CSS modules.

### Setup and Install

#### Install Dependencies

Make sure you have Node.js installed, then run:

```
yarn install
```

### Managing Brand Tokens

#### How to Add a New Brand

1. Create a new JSON file inside `src/tokens/`

```
src/tokens/my-brand.json
```

2. Define your brand tokens:

```json
{
  "color": {
    "primary": { "value": "#ff6600" },
    "secondary": { "value": "#0066ff" }
  }
}
```

3. Run the build script to regenerate the CSS variables:

```
yarn build
```

4. This will create a new CSS module for the brand inside `src/components/BrandProvider/css`. The css variables will also be versioned to avoid potential conflicts especially within MFE environments.

```css
/* src/components/BrandProvider/css/my-brand.module.css */
[data-brand='my-brand-1.0.0'] {
  --primary-color: var(--color-primary);
  --secondary-color: var(--color-secondary);
}
```

### Running the Build

#### Generating CSS variables

To generate the CSS variables from the brand tokens, run:

```
yarn build
```

### Using the Brand Provider Component

Once the brand tokens are generated, use the BrandProvider component to apply branding.

#### Example: Using the Brand Provider

```jsx
import { BrandProvider } from './@brand-tokens'

export default function App() {
  return (
    <BrandProvider brand="my-brand">
      <div className="myComponent">Hello, branded world! 🎨</div>
    </BrandProvider>
  )
}
```

This will:

- Apply the correct CSS variables from the brand specific css modules

### Publishing a Package

1. Ensure the correct semantic version is set within `package.json`

```json
{
  "name": "brand-tokens",
  "version": "1.0.0"
}
```

Then publish this package as an NPM module:

```
npm publish --access public
```
