
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
  ```

## 🗂️ Key Components

### 1.  **Layout Structure**

// Root Layout Components
- Navbar
- Sidebar
- SessionProvider
- Main Content Area

### 2.  **Data Models**

#### **User Model**

```typescript
interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  birthdate?: string;
  // Additional fields managed by NextAuth
}
```
#### **Movie Model**

```typescript
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  adult: boolean;
}
```

### 3.  **API Structure**

#### **Authentication Endpoints**

-   `/api/auth/[...nextauth]`
    
-   `/api/auth/signup`
    
-   `/api/user`
    

#### **Movie Related Endpoints**

-   `/api/movies/trending`
    
-   `/api/movies/popular`
    
-   `/api/movies/top-rated`
    
-   `/api/movies/upcoming`
    
-   `/api/movies/[id]`
    
-   `/api/search`
    

----------

## 🚀 Server-Side Implementation

### 1.  **Server Components**

Used for initial page rendering, data fetching, and database operations.

```typescript
export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieData = await getMovieData(params.id);
  const processedData = processMovieData(movieData);
  return <MovieComponent data={processedData} />;
}
```

### 2.  **Server Actions**

Handle server-side operations like data fetching and processing.

```typescript
"use server";

export async function getMovies(): Promise<MoviesState> {
  const API_KEY = process.env.TMDB_API_KEY;
  const endpoints = [
    'trending/movie/day',
    'movie/popular',
    'movie/top_rated',
    'movie/now_playing',
    'movie/upcoming'
  ];

  try {
    const responses = await Promise.all(
      endpoints.map(endpoint =>
        fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`, {
          next: { revalidate: 3600 }
        })
      )
    );
    // Process and return data
  } catch (error) {
    throw error;
  }
}
```
### 3.  **Database Operations**

Interact with MongoDB for data storage and retrieval.

```typescript
export async function getDatabaseService() {
  const client = await clientPromise;
  const db = client.db();
  return {
    users: db.collection('users'),
    movies: db.collection('movies'),
    // Other collections
  };
}
```

### 4.  **Caching and Data Revalidation**

Implement caching strategies for better performance.

```typescript
export async function fetchWithRevalidation(url: string) {
  return fetch(url, {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['movies']  // Cache tags for selective revalidation
    }
  });
}
```
----------

## 🔧 Environment Configuration

Required environment variables:

```plaintext
NEXTAUTH_SECRET=your_secret
TMDB_API_KEY=your_tmdb_api_key
MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=your_app_url
```
----------

## 🛡️ Security Features

-   JWT-based authentication
    
-   Password hashing
    
-   Protected API routes
    
-   Session management
    
-   CORS configuration
    
-   HTTP-only cookies
    

----------

## 📊 Performance Optimizations

-   Image optimization
    
-   Lazy loading
    
-   Component-level code splitting
    
-   Server-side rendering
    
-   API response caching
    
-   Revalidation strategies
    

----------

## 📂 SEO and Metadata

-   Dynamic metadata for pages
    
-   OpenGraph tags
    
-   Twitter cards
    
-   Robots.txt configuration
    
-   Sitemap generation

-   Multiple language support
    

----------

## 🚀 Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/TunisiaFlicks.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:  
    Create a  `.env.local`  file and add the required variables.
    
4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and visit:
    ``
    http://localhost:3000
    ``
----------

## 🙏 Acknowledgments

-   **TMDB API**  for providing movie and TV show data.
    
-   **Next.js**  for the awesome framework.
    
-   **Tailwind CSS**  for the utility-first CSS framework.
    

----------

Enjoy streaming with  **TunisiaFlicks**! 🎬🍿
