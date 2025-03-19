# TunisiaFlicks 🎥

**TunisiaFlicks** is a modern web application built with **Next.js** that provides a streaming platform for movies and TV shows. The platform offers a user-friendly interface with features like authentication, search functionality, and a comprehensive movie/TV show browsing experience.

---

## 🌟 Features

### 1. **Authentication System**
- Secure authentication using **NextAuth.js**
- **MongoDB** adapter for user data storage
- Credential-based authentication
- JWT-based session management
- Custom login/signup pages

### 2. **Movie/TV Show Features**
- Trending movies and TV shows
- Popular content listing
- Search functionality
- Detailed movie/TV show pages
- Similar content recommendations
- Cast information
- Multiple streaming sources integration

### 3. **User Interface**
- Responsive design
- Dark/Light mode support
- Custom UI components
- Interactive carousels
- Loading states and animations

---

## 🛠️ Technical Stack

### **Frontend**
- **Next.js 13+** (App Router)
- **React**
- **Tailwind CSS**
- **TypeScript**
- **ShadcnUI Components**

### **Backend**
- **Next.js API Routes**
- **MongoDB**
- **NextAuth.js**

### **External APIs**
- **TMDB (The Movie Database) API**

### **Development Tools**
- **ESLint**
- **TypeScript**
- **Vercel Analytics**
- **Speed Insights**

---

## 🏗️ Project Architecture

```mermaid
graph TD
    subgraph "Client Side"
        A[Web Browser] --> B[Next.js App Router]
        B --> C[Pages/Components]
        C --> D[UI Components]
        C --> E[Client Actions]
    end

    subgraph "Server Side"
        F[Server Components] --> G[Server Actions]
        G --> H[API Integration]
        I[Authentication Service] --> J[NextAuth.js]
        K[Database Service] --> L[MongoDB]
    end

    subgraph "External Services"
        M[TMDB API]
        N[Image CDN]
    end

    B --> F
    E --> G
    H --> M
    J --> L
    G --> L
    C --> N
