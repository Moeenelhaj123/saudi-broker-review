# Broker Review Website for Saudi Arabia

A comprehensive platform for Arabic-speaking clients in Saudi Arabia to research, compare, and review financial brokers with culturally appropriate design and functionality.

**Experience Qualities**:
1. **Trustworthy** - Clear, professional design that instills confidence in financial decision-making
2. **Accessible** - Easy navigation and readable Arabic content with proper RTL support
3. **Informative** - Rich, detailed broker information presented in digestible formats

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple broker profiles with comparison features, review system, and search functionality requiring moderate state management

## Essential Features

**Broker Directory**
- Functionality: Browse and search through verified Saudi-licensed brokers
- Purpose: Help users discover regulated brokers suitable for their needs
- Trigger: Landing page access or search action
- Progression: Homepage → Browse/Search → Broker List → Individual Broker Profile
- Success criteria: Users can find relevant brokers within 3 clicks

**Broker Comparison Tool**
- Functionality: Side-by-side comparison of selected brokers' features, fees, and ratings
- Purpose: Enable informed decision-making through direct feature comparison
- Trigger: "Compare" button on broker profiles or dedicated comparison page
- Progression: Select Brokers → Comparison Table → Detailed Analysis → Action (Visit/Contact)
- Success criteria: Clear visual differences highlighted between 2-4 brokers

**Review and Rating System**
- Functionality: Submit and read authentic reviews with star ratings
- Purpose: Provide peer insights and transparency in broker selection
- Trigger: "Write Review" or "Read Reviews" buttons
- Progression: View Reviews → Filter/Sort → Read Details → Optionally Submit Review
- Success criteria: Reviews are easily readable and submission process is straightforward

**Broker Profile Pages**
- Functionality: Comprehensive broker information including regulation, fees, platforms, and contact details
- Purpose: Provide all necessary information for broker evaluation
- Trigger: Clicking on broker from directory or search results
- Progression: Broker Card → Full Profile → Sections (Overview, Fees, Reviews) → Contact/Visit
- Success criteria: All key broker information is accessible and well-organized

## Edge Case Handling

- **No Search Results**: Display helpful suggestions and popular brokers
- **Missing Broker Data**: Show available information with clear indicators for missing details
- **Review Moderation**: Flag inappropriate content with community reporting
- **Mobile Responsive**: Ensure all features work seamlessly on mobile devices
- **Slow Loading**: Implement skeleton screens and progressive loading

## Design Direction

The design should feel trustworthy, professional, and culturally appropriate for Saudi Arabian users - emphasizing clean lines, ample whitespace, and a sense of financial authority while remaining approachable and modern.

## Color Selection

Complementary (opposite colors) - Deep blue conveys trust and financial stability, while white provides clarity and cleanliness, creating a professional contrast ideal for financial services.

- **Primary Color**: Deep blue (oklch(0.3 0.15 240)) communicates trust, stability, and financial expertise
- **Secondary Colors**: Light blue (oklch(0.85 0.05 240)) for accents and hover states, soft gray (oklch(0.95 0 0)) for subtle backgrounds
- **Accent Color**: Warm gold (oklch(0.7 0.15 65)) for CTAs, ratings, and premium features to evoke prosperity
- **Foreground/Background Pairings**: 
  - Background White (oklch(1 0 0)): Dark text (oklch(0.2 0 0)) - Ratio 12.6:1 ✓
  - Primary Deep Blue (oklch(0.3 0.15 240)): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent Gold (oklch(0.7 0.15 65)): Dark text (oklch(0.2 0 0)) - Ratio 5.1:1 ✓
  - Light Blue (oklch(0.85 0.05 240)): Dark text (oklch(0.2 0 0)) - Ratio 6.8:1 ✓

## Font Selection

Tajawal font family provides excellent Arabic readability with modern, clean letterforms that convey professionalism while maintaining cultural authenticity for Saudi users.

- **Typographic Hierarchy**: 
  - H1 (Site Title): Tajawal Bold/32px/normal letter spacing
  - H2 (Section Headers): Tajawal Medium/24px/normal letter spacing  
  - H3 (Broker Names): Tajawal Medium/20px/normal letter spacing
  - Body Text: Tajawal Regular/16px/normal letter spacing
  - Small Text (Reviews, Meta): Tajawal Regular/14px/normal letter spacing

## Animations

Subtle, purposeful animations that enhance usability without distracting from financial content - focusing on smooth transitions and gentle hover states that reinforce interactive elements.

- **Purposeful Meaning**: Gentle hover animations on broker cards and buttons to indicate interactivity, smooth page transitions to maintain context
- **Hierarchy of Movement**: Primary focus on CTA buttons and broker comparison actions, secondary animations for card hover states and navigation

## Component Selection

- **Components**: Card for broker profiles, Table for comparisons, Badge for ratings/regulation status, Button variants for different action levels, Sheet for mobile filters, Tabs for broker profile sections
- **Customizations**: RTL-aware layout components, Arabic number formatting, star rating component, broker comparison table with sticky headers
- **States**: Buttons with hover/active states in gold accent, Cards with subtle shadow on hover, Loading skeletons for broker data, Empty states with helpful guidance
- **Icon Selection**: Star icons for ratings, Shield for regulation status, Search for discovery, Compare for comparison tool, Phone/Email for contact
- **Spacing**: Generous padding (p-6, p-8) for cards, consistent margins (mb-4, mb-6) between sections, tight spacing (gap-2) for related elements
- **Mobile**: Responsive grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3), collapsible comparison table, bottom sheet for mobile filters, touch-friendly button sizes (min-h-12)