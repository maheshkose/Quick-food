# Copilot Instructions for Tomato Monorepo

## Project Overview
- This is a monorepo with three main folders:
  - `Frontend/` – User-facing React app (Vite, HMR, ESLint)
  - `Admin/` – Admin React app (Vite, HMR, ESLint)
  - `Backend/` – Node.js/Express REST API for food data

## Architecture & Data Flow
- **Frontend/Admin**: Each is a separate Vite+React project with its own `src/` and `public/`.
  - Components are organized by feature (e.g., `Components/Sidebar/`, `Pages/Cart/`).
  - State management is handled via React Context in `Frontend/src/Context/`.
  - API calls are made to the backend (see below for endpoints).
- **Backend**: Express server with modular structure:
  - `Models/food_model.js`: Mongoose schema for food items
  - `Controllers/foodController.js`: Handles CRUD and validation for food
  - `Routes/foodRoute.js`: API endpoints for food (mounted at `/api/food`)
  - `Uploads/`: Stores uploaded images, served at `/images/*`
  - `Middlewares/`: Custom error handling and async wrappers
  - `config/db.js`: MongoDB connection logic

## Developer Workflows
- **Start Frontend/Admin**: `npm install && npm run dev` in each folder
- **Start Backend**: `npm install && node server.js` in `Backend/`
- **API Testing**: Use Postman or similar to hit endpoints like `POST /api/food`, `GET /api/food?page=1&limit=10`
- **Image Access**: Uploaded images are available at `/images/<filename>` (see `server.js`)
- **Environment Variables**: Backend uses `.env` for secrets and DB config

## Project-Specific Conventions
- **React**: Use functional components, hooks, and Context for state
- **Backend**: Use async/await with `catchAsyncError` for all controllers
- **Error Handling**: Always use `ErrorHandler` and `errorMiddleware` for API errors
- **Validation**: Food model enforces unique names, min length, and required fields
- **Pagination**: `GET /api/food` supports `page` and `limit` query params
- **File Uploads**: Images are uploaded and referenced by filename in the DB

## Integration Points
- **Frontend/Admin ↔ Backend**: Communicate via REST API (`/api/food`)
- **Backend ↔ MongoDB**: All data persisted in MongoDB via Mongoose
- **Static Files**: Backend serves images from `Uploads/` at `/images/`

## Examples
- To fetch paginated food list: `GET /api/food?page=2&limit=5`
- To add a food item (with image): `POST /api/food` (multipart/form-data)
- To use a food image in React: `<img src={process.env.REACT_APP_API_URL + '/images/' + imageFilename} />`

## Key Files
- `Backend/server.js`: Express app setup, static file serving, error middleware
- `Backend/Controllers/foodController.js`: API logic and validation
- `Backend/Models/food_model.js`: Mongoose schema
- `Frontend/src/Context/StoreContext.jsx`: App-wide state
- `Admin/src/Components/Sidebar/Sidebar.jsx`: Example of feature-based component structure

---

If you add new features or change conventions, update this file to keep Copilot and other AI agents productive.
