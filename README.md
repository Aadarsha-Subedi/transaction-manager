# A Transaction Manager Full-Stack Data Management Application (mini-project)

A mini-project full-stack web application built with React, TypeScript, and Express.js that demonstrates advanced data management with pagination, sorting, filtering, and CRUD operations. This project showcases best practices in state management, API integration, and responsive UI design.

## 📋 Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation & Setup](#installation--setup)
-   [Running the Application](#running-the-application)
-   [API Documentation](#api-documentation)
-   [Frontend Features](#frontend-features)
-   [State Management](#state-management)
-   [Contributing](#contributing)
-   [License](#license)

## 🎯 Overview

This mini-project is a comprehensive data management system that allows users to browse, manage, and interact with large datasets efficiently. The application features two main modules: **Customers** and **Transactions**, each with full CRUD (Create, Read, Update, Delete) capabilities, advanced pagination, sorting, filtering, and bulk operations.

The backend provides RESTful API endpoints with simulated network delays, while the frontend delivers a responsive and intuitive user interface built with React and TypeScript.

## ✨ Features

### Core Features

-   **📊 Advanced Pagination**: Navigate large datasets with configurable page sizes and smooth offset-based pagination
-   **🔄 Sorting**: Sort data by multiple fields in ascending or descending order
-   **🔍 Filtering & Search**: Search and filter customers and transactions by various criteria
-   **➕ Full CRUD Operations**: Create, read, update, and delete records for both customers and transactions
-   **☑️ Bulk Operations**: Select multiple records and perform batch actions (delete selected items)
-   **⚡ Loading States**: Visual feedback with loading spinners during data fetching
-   **❌ Error Handling**: Graceful error messages and error recovery mechanisms
-   **🎨 Responsive Design**: Fully responsive UI built with Tailwind CSS that works on all devices
-   **📱 Tab-Based Navigation**: Easy switching between Customers and Transactions modules

### Data Management

-   **Customers Module**: Manage customer information with pagination and sorting
-   **Transactions Module**: Track and manage transaction records with advanced filtering
-   **Real-time Counts**: Display total record counts for each module
-   **Dual List Management**: Manage filtered and sorted lists alongside original data

### User Experience

-   **Intuitive Interface**: Clean, modern UI with easy-to-use controls
-   **Visual Feedback**: Loading indicators, error messages, and success confirmations
-   **Keyboard & Mouse Support**: Full keyboard and mouse navigation support
-   **Dynamic Tab Counts**: Display record counts on active tabs

## 🛠 Tech Stack

### Frontend

-   **React 19** - UI library with hooks
-   **TypeScript** - Type-safe development
-   **Vite** - Next-generation build tool
-   **Tailwind CSS 4** - Utility-first CSS framework
-   **Zustand** - Lightweight state management
-   **Axios** - HTTP client for API calls
-   **Tabler Icons** - Beautiful icon library
-   **ESLint & Prettier** - Code quality and formatting

### Backend

-   **Node.js** - JavaScript runtime
-   **Express.js 5** - Minimalist web framework
-   **CORS** - Cross-Origin Resource Sharing middleware
-   **Nodemon** - Development auto-reload utility

## 📁 Project Structure

```
tables-pagination/
├── backend/
│   ├── server.js                 # Express server setup and routes
│   ├── package.json              # Backend dependencies
│   └── utils/
│       ├── customer-data.js       # Sample customer data
│       └── transaction-data.js    # Sample transaction data
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx              # React entry point
│   │   ├── pages/
│   │   │   ├── home.tsx          # Main home page with tab navigation
│   │   │   ├── customers/
│   │   │   │   ├── customers-page.tsx   # Customers list and management
│   │   │   │   └── customer-crud.tsx    # Create, Update, Delete modals
│   │   │   └── transactions/
│   │   │       ├── transaction-page.tsx # Transactions list
│   │   │       └── transaction-crud.tsx # Transaction modals
│   │   ├── components/
│   │   │   ├── container.tsx     # Layout wrapper component
│   │   │   ├── error-info.tsx    # Error message display
│   │   │   └── loader-info.tsx   # Loading spinner component
│   │   ├── store/
│   │   │   ├── activeTabStore.ts # Current tab state
│   │   │   ├── customerStore.ts  # Customer data state
│   │   │   ├── flowStore.ts      # UI flow state
│   │   │   ├── paginationStore.ts # Pagination state
│   │   │   ├── sortStore.ts      # Sorting state
│   │   │   └── transactionStore.ts # Transaction data state
│   │   └── styles/
│   │       └── index.css         # Global styles
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.ts            # Vite configuration
│   ├── tsconfig.json             # TypeScript configuration
│   ├── eslint.config.js          # ESLint configuration
│   └── README.md                 # Frontend-specific documentation
│
└── README.md                     # This file
```

## 📦 Prerequisites

Before getting started, ensure you have the following installed:

-   **Node.js** (v16 or higher)
-   **npm** (v7 or higher) or **yarn**
-   **Git** (optional, for cloning)

Verify installations:

```bash
node --version
npm --version
```

## 🚀 Installation & Setup

### 1. Clone or Download the Repository

```bash
# Clone the repository
git clone <repository-url>
cd tables-pagination

# Or download and extract the ZIP file
```

### 2. Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 3. Setup Frontend

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## ▶️ Running the Application

### Development Mode (Recommended)

Run both backend and frontend concurrently for development:

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm start
# Server runs on http://localhost:8000
```

**Terminal 2 - Start Frontend Development Server:**

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173 (or next available port)
```

### Production Build

**Build Frontend:**

```bash
cd frontend
npm run build
# Creates optimized build in dist/ folder
```

**Preview Production Build:**

```bash
npm run preview
# Preview production build locally
```

### Additional Commands

**Frontend:**

```bash
npm run lint           # Run ESLint to check code quality
npm run build          # Create production build
```

**Backend:**
No additional build step required - runs directly with Node.js

## 📡 API Documentation

### Base URL

```
http://localhost:8000
```

### Endpoints

#### Get Customers with Pagination

**Endpoint:** `POST /customers`

**Request Body:**

```json
{
	"limit": 30,
	"offset": 0
}
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      ...
    }
  ],
  "count": 500
}
```

**Parameters:**

-   `limit` (number): Number of records per page (default: 30)
-   `offset` (number): Starting position for records (0-based)

---

#### Get Transactions with Pagination

**Endpoint:** `POST /transactions`

**Request Body:**

```json
{
	"limit": 30,
	"offset": 0
}
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "customerId": 1,
      "amount": 150.00,
      ...
    }
  ],
  "count": 1000
}
```

**Parameters:**

-   `limit` (number): Number of records per page (default: 30)
-   `offset` (number): Starting position for records (0-based)

**Note:** The API includes a 5-second delay to simulate real-world network latency.

---

## 🎨 Frontend Features

### State Management with Zustand

The application uses **Zustand** for lightweight and efficient state management:

#### Available Stores:

1. **`activeTabStore`** - Manages the currently active tab (Customers/Transactions)
2. **`customerStore`** - Handles customer data, CRUD operations, and filtering
3. **`transactionStore`** - Manages transaction data and operations
4. **`paginationStore`** - Controls pagination state (limit, offset, first/last page)
5. **`sortStore`** - Manages sorting parameters (sort key and direction)
6. **`flowStore`** - Manages UI flow and modal states

### Components

#### Page Components

-   **`home.tsx`** - Main entry point with tab navigation
-   **`customers-page.tsx`** - Customers management interface
-   **`transactions-page.tsx`** - Transactions management interface

#### CRUD Components

-   **`customer-crud.tsx`** - Modal dialogs for adding, updating, and deleting customers
-   **`transaction-crud.tsx`** - Modal dialogs for transaction management

#### Layout Components

-   **`container.tsx`** - Wrapper component for consistent spacing
-   **`loader-info.tsx`** - Loading spinner display
-   **`error-info.tsx`** - Error message display

### UI Features

-   **Responsive Tables** - Data displayed in clean, sortable tables
-   **Action Buttons** - Edit, delete, and add new records
-   **Search Bar** - Filter records by keyword
-   **Pagination Controls** - Next/Previous navigation and page size selector
-   **Bulk Selection** - Select multiple records for batch operations
-   **Modal Dialogs** - For create, read, and update operations

## 🧠 State Management

### How State Management Works

The application uses **Zustand** stores to manage global state efficiently:

```typescript
// Example: Accessing Pagination Store
const { limit, offset, setOffset } = usePaginationStore();

// Example: Accessing Customer Store
const { customers, setCustomers, customerCount } = useCustomerStore();
```

### Data Flow

1. **User Interaction** → Component triggers action
2. **State Update** → Zustand store updates state
3. **API Call** → Axios fetches data from backend
4. **State Mutation** → Update store with fetched data
5. **Re-render** → React components re-render with new data

### Key State Properties

**Pagination Store:**

-   `limit` - Records per page
-   `offset` - Current page offset
-   `isFirstPage` - Boolean for first page
-   `isLastPage` - Boolean for last page

**Customer Store:**

-   `customers` - Array of customer records
-   `filteredCustomers` - Filtered customer list
-   `selectedCustomers` - IDs of selected customers
-   `customerCount` - Total customer count

**Sort Store:**

-   `key` - Field to sort by
-   `direction` - Sort direction (asc/desc)

## 🔄 User Workflows

### Viewing Customers

1. Navigate to the Customers tab
2. System fetches first page of customers (30 per page)
3. Table displays customer information
4. Use pagination controls to browse pages
5. Click column headers to sort
6. Use search bar to filter results

### Adding a Customer

1. Click the "+" button in the customers toolbar
2. Fill in customer details in the modal
3. Click "Save" to create the customer
4. Table refreshes with new customer

### Editing a Customer

1. Locate the customer in the table
2. Click the edit (pencil) icon
3. Modify customer information in the modal
4. Click "Update" to save changes

### Deleting Customers

1. **Individual Delete**: Click trash icon on specific customer
2. **Bulk Delete**:
    - Check multiple customers
    - Click "Delete Selected"
    - Confirm deletion

### Sorting & Filtering

1. Click column headers to sort ascending/descending
2. Use search input to filter by keyword
3. Pagination recalculates based on filtered results

## 🛠 Development Tips

### Adding New Fields to Customers

1. Update customer data in `backend/utils/customer-data.js`
2. Update `customerStore.ts` interface
3. Add columns to `customers-page.tsx` table
4. Update CRUD form in `customer-crud.tsx`

### Customizing Pagination

Edit `paginationStore.ts` to change default page size:

```typescript
limit: 30,  // Change this value
```

### Styling

All styles use **Tailwind CSS**. Modify `frontend/src/styles/index.css` or update component classes:

```tsx
<div className='px-4 py-2 bg-blue-500 text-white rounded'>Content</div>
```

## 🚨 Error Handling

The application includes comprehensive error handling:

-   **Network Errors**: Displays error message if API fails
-   **Validation Errors**: Prevents invalid data submission
-   **Loading States**: Shows loading spinner during data fetch
-   **Error Recovery**: Allows users to retry failed operations

## 📝 Code Standards

The project follows these standards:

-   **TypeScript** - Strict type checking enabled
-   **ESLint** - Code quality rules enforced
-   **Prettier** - Consistent code formatting
-   **Component Structure** - Functional components with hooks
-   **Naming Conventions** - PascalCase for components, camelCase for functions

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **ISC License** - see individual package.json files for details.

---

## 👤 Author

**Aadarsha Subedi**

## 🆘 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## 🚀 Future Enhancements

Potential features for future releases:

-   [ ] Authentication & Authorization
-   [ ] Database integration (PostgreSQL, MongoDB)
-   [ ] Advanced filtering with multiple criteria
-   [ ] Export to CSV/PDF
-   [ ] Data visualization with charts
-   [ ] Real-time updates with WebSockets
-   [ ] Undo/Redo functionality
-   [ ] Multi-language support (i18n)
-   [ ] Dark mode theme

---

**Last Updated:** November 2025

Thank you for visiting! Happy coding! 🎉
