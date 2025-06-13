# FreightCar America - Shopify Theme

A custom Shopify theme for FreightCar America, specializing in railroad parts and components with B2B e-commerce functionality.

## 🚂 Project Overview

This is a custom Shopify theme built on the **Refresh theme v15.2.0** framework, specifically designed for FreightCar America's B2B railroad parts business.

### Key Features

- **Custom FCA Sections**: Specialized sections for hero, running repair parts, fabrication, and specialty parts
- **B2B Integration**: BSS Commerce B2B login and access control system
- **Multi-language Support**: 45+ locale files for international customers
- **Brand-specific Styling**: Custom "Outage Cut" font and FreightCar America color scheme
- **Responsive Design**: Mobile-optimized layouts for all sections

## 🎨 Brand Colors

- **Primary Blue**: `#5784CC`
- **Primary Red**: `#D31244` 
- **Navy**: `#00205B`
- **White**: `#FFFFFF`

## 📁 Project Structure

```
├── assets/          # CSS, JS, images, and fonts
├── config/          # Theme configuration files
├── layout/          # Theme layout templates
├── locales/         # Translation files (45+ languages)
├── sections/        # Reusable theme sections
│   ├── fca-hero.liquid
│   ├── fca-running-repair-parts.liquid
│   ├── fca-fabrication-parts.liquid
│   ├── fca-specialty-parts.liquid
│   ├── fca-how-to-order.liquid
│   └── fca-experience.liquid
├── snippets/        # Reusable code snippets
├── templates/       # Page templates
└── README.md
```

## 🔧 Custom Sections

### FCA-Specific Sections
- **fca-hero**: Main hero banner with company messaging
- **fca-running-repair-parts**: Running repair parts showcase with features
- **fca-fabrication-parts**: Custom fabrication services section  
- **fca-specialty-parts**: Specialty parts sourcing information
- **fca-how-to-order**: Step-by-step ordering process
- **fca-experience**: Company experience and expertise section

## 🛠 Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd freight-car-america-theme
   ```

2. **Install Shopify CLI** (if not already installed)
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

3. **Connect to your Shopify store**
   ```bash
   shopify theme dev
   ```

## 📄 Key Templates

- `index.json` - Current homepage
- `index.jumpseat-new-design.json` - New design implementation
- Product, collection, and customer templates with B2B controls

## 🔐 B2B Features

- **BSS Commerce Integration**: Advanced B2B login and access control
- **Customer Access Control**: Role-based content visibility
- **Price Management**: Hide/show pricing based on customer status
- **Passcode Protection**: Secure access to specific content
- **IP/Region Restrictions**: Geographic access controls

## 🌐 Multi-language Support

Supports 45+ languages including:
- English (default)
- Spanish, French, German, Italian, Portuguese
- Eastern European: Polish, Czech, Hungarian
- Asian: Japanese, Korean, Chinese, Thai, Vietnamese
- Nordic: Danish, Swedish, Norwegian, Finnish

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly navigation
- Optimized for B2B workflows

## 🚀 Deployment

1. **Development Testing**
   ```bash
   shopify theme dev
   ```

2. **Deploy to Staging**
   ```bash
   shopify theme push --theme-id=[staging-theme-id]
   ```

3. **Deploy to Production**
   ```bash
   shopify theme push --theme-id=[live-theme-id]
   ```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly on development theme
4. Submit a pull request

## 📞 Support

For questions about this theme implementation, contact the development team.

---

**FreightCar America** - Setting a New Standard in Railroad Parts & Components 