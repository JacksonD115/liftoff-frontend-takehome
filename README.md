# Liftoff Frontend Take-Home - Bike Shop

An Expo React Native implementation of the given bike-shop design, built using TypeScript, NativeWind, Zustand, and React Native Reanimated for app animation.

## How to run

This project requires Node.js and npm

```bash
npm install
npx expo start
```

Open the project in a compatible Expo Go app or iOS simulator (shift + i on Mac). The weather API integration requires internet connection. No API key or environment variables needed for that.

## Features

- Product listing with category filters and search
- Product details with description and specification tabs
- Live Toronto weather using Open-Meteo API in the specification tab
- Cart with quantity controls, removal at 0 quantity, and calculated totals.
- Promo-code support: enter BIKE30 in the field for a 30% discount
- Animated slide-to-confirm demo checkout
- Reanimated button scaling, tab selection, screen transitions, and checkout motion

## Implementation decisions

The product data in this project is purely local as the exercise focuses on implementing the frontend from the Figma design. I used Zustand to manage shared cart state, as well as reusable components to handle product cards, buttons, quality controls, and totals.

I chose the Open-Meteo public API for my API as the weather is relevant to cycling. The weather panel includes loading and error states to fallback when the user has spotty connection or if the API is experiencing difficulties. The request is canceled when the screen unmounts.

## Assumptions and tradeoffs

- Weather uses a fixed Toronto location for the sake of the project, for product I would fetch user location
- Delivery is free, and checkout is demonstration only, no payment is processed
- Cart state is held in local memory and resets on app restart
- Navigation is implemented around the shopping flow. Destinations not specified in the exercise were not added (footer view)
- The interface follows the Figma visual design, with some minor differences in styling
- Screen transitions animate content rather than the native header. I used the header’s back button for back navigation

## Validation

TypeScript checking and a web production export passed during development.
Manually tested on: iPhone 13 mini and iPhone 17 Pro Max

## Submission links

Video walkthrough: https://youtu.be/mlfSRLYwlXg

AI conversation transcripts: (`<Liftoff Frontend ChatGPT Transcript.pdf>`) in the repo
