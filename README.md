# React-Point-of-Sale

## Getting Started

- Run `yarn start` and it will be available on [http://localhost:3000](http://localhost:3000)

## Assumptions

- Input device: Barcode scanner with Exit button
- Two output devices:
  - LCD Display
  - Printer

## Functionality

- Single product sale
  - Barcode is being scanned
  - If the product is found in the database then the product name and price is printed on LCD Display
  - If the product is not available then “Product not found” error message is printed on LCD Display
- When Exit button is pressed
  - List of all properly scanned items with prices is displayed on Printer as well as the Total Sum
  - Total Sum of all items prices is displayed on a LCD Display
