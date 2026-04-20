File Explorer (MEVN Stack)
A full-stack File Explorer application built using MongoDB, Express.js, Vue.js 3, and Node.js.
It allows users to navigate folders dynamically using a recursive tree structure.

Features
View files & folders in tree structure
Expand / Collapse folders
Lazy loading (fetch data only when needed)
Recursive folder navigation
Dynamic data from MongoDB Atlas
Clean sidebar UI

Create new folders
Create new files
Create inside selected folder or root
Dynamic selection handling (VS Code-like behavior)
Selected file/folder preview in main panel

Tech Stack

Frontend
Vue.js 3 (Composition API)
Tailwind CSS
Pinia (State Management)

Backend
Node.js
Express.js

Database
MongoDB Atlas

HTTP Client
Axios

Project Structure
File-Explorer/
│
├── Backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│ └── .env
│
├── Frontend/
│ ├── src/
│ ├── components/
│ ├── stores/
│ ├── App.vue
│ ├── api.js
│ ├── main.js
│ ├── package.json
│
└── .gitignore
└── README.md

Backend Implementation
The backend of this application is built using Node.js and Express.js, and it connects to MongoDB Atlas using Mongoose.

Server Setup
Express is used to create the server
Middleware used:
cors → to allow cross-origin requests
express.json() → to parse JSON request bodies
Environment variables are managed using .env
The server connects to MongoDB using:
mongoose.connect(process.env.MONGO_URI)
Once connected, the server runs on the defined port.

 Database Schema (Mongoose)
A File model is created with the following fields:
name (String)
type (String: "file" | "folder")
parentId (ObjectId | null)

parentId is used to create a folder hierarchy (tree structure)

API Routes
All routes are defined in routes/fileRoutes.js and prefixed with /api.

1. Get Files
GET /api/files?parentId=ID
Fetches files/folders based on parentId
Behavior:
parentId = null → fetch root files
parentId = folderId → fetch child files

2. Create File / Folder
POST /api/files

Request Body:
{
  "name": "File/Folder Name",
  "type": "file" | "folder",
  "parentId": "optional"
}

Behavior:
If parentId is provided → item is created inside that folder
If parentId is null → item is created in root

Backend Logic
Uses parentId to build hierarchical data
Converts parentId into ObjectId for querying
Returns JSON response

Environment Variables
The backend uses a .env file:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Notes
MongoDB Atlas is used as a cloud database
Error handling is implemented using try-catch
API returns JSON responses

Frontend Implementation

The frontend is built using Vue.js 3 (Composition API) with Tailwind CSS and Pinia.

API Integration

Axios is used to communicate with the backend.

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

All API requests are made using this instance.

State Management (Pinia)
Pinia is used to manage file data.
files → stores files grouped by parentId

Example structure:

files = {
  "root": [...],
  "folderId1": [...],
  "folderId2": [...]
}
Data Fetching
On component mount (onMounted), root files are fetched
Files are stored using "root" key
Child data is fetched only when folder is opened
Folder Navigation
Clicking a folder toggles open/close
When opened:
API call is made (if not already fetched)
Child files are loaded dynamically

Create Functionality
Users can create files and folders using toolbar buttons.
A prompt is used to enter the name.

Data is sent to backend via POST /api/files

Pinia store updates UI instantly by pushing new data into the correct parent key.

Selection Logic
selectedId is used to track current selection.
Clicking on:
Folder/File → sets selectedId
Empty space → resets selectedId (root)

This ensures correct file placement similar to VS Code.

Recursive Structure
Implemented using TreeNode.vue
Component calls itself for nested folders

This allows infinite nesting of folders

Lazy Loading
Data is fetched only when folder is expanded
Prevents unnecessary API calls
Improves performance

UI & Styling
Tailwind CSS is used for styling
Sidebar-based layout
Folder & file icons:
Closed folder
Open folder
File
Expand/Collapse arrows (▸ / ▾)
Dark theme UI

Responsiveness
Works well on desktop
Clean sidebar layout
Expandable structure for navigation

Key Highlights
Recursive component architecture
Lazy loading for performance optimization
Create file & folder functionality
Dynamic selection handling (root vs nested)
Real-time UI updates
Clean state management using Pinia
Scalable folder hierarchy
Fast and minimal UI