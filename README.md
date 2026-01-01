

A full-stack web application designed for managing and streaming departmental educational resources. This project utilizes a Node.js backend and a React frontend to facilitate video uploads and resource sharing across various academic departments.

>here is the website url: https://edu-portal-eta.vercel.app/
---

## Technical Architecture Note

> [!IMPORTANT]
> **Storage Implementation:** This project currently utilizes **local file system storage** for video assets rather than cloud-based object storage (like AWS S3). While functional for development and small-scale use, please be aware that this is not the most efficient method for high-concurrency streaming or production-level scaling.

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your local machine:

* **Node.js** (LTS version recommended)
* **npm** (Node Package Manager)
* **MongoDB Compass** (Required for authentication and database management)

---

## Installation and Setup

### 1. Clone the Repository

Begin by cloning the project to your local machine:

```bash
git clone https://github.com/PRERAN001/EDU-PORTAL-NOT-OPTIMIZED.git
cd EDU-PORTAL-NOT-OPTIMIZED

```

### 2. Critical Folder Configuration

Before starting the servers, you must manually create a storage directory in the backend:

1. Navigate to the **backend** folder.
2. Create a new folder named **uploads**.
3. **Note:** If this folder is missing, all resource and video uploads will fail as the server has no destination path to write the files.

### 3. Frontend Setup

Open a terminal and navigate to the `frontend` directory:

1. Install the necessary dependencies:
```bash
npm install

```


2. Start the development server:
```bash
npm run dev

```



### 4. Backend Setup

Open a second terminal and navigate to the backend folder:

1. **Warning:** Do not rename the backend folder. The frontend relies on specific file paths for resource fetching and uploads. Changing the folder name will break functionality unless you manually update all path references in the frontend source code.
2. Install dependencies:
```bash
npm install

```


3. Start the server using nodemon:
```bash
npx nodemon server.js

```



---

## Configuration

### Modifying Departments

To customize the list of departments, you must update three specific files. Ensure the department IDs match across all files to maintain data integrity.

#### Update Dashboard Components

Modify the `departments` array in these two files to update the dashboard icons and statistics:

* `frontend/src/pages/Userhomepage.jsx`
* `frontend/src/pages/Adminhomepage.jsx`

```javascript
const departments = [
  { id: 'cse', name: 'cse', icon: <Cpu size={24} />, students: '1,200' },
  { id: 'it', name: 'it', icon: <Globe size={24} />, students: '850' },
  { id: 'ds', name: 'ds', icon: <Database size={24} />, students: '920' },
  { id: 'cs', name: 'cs', icon: <ShieldCheck size={24} />, students: '740' },
  { id: 'hr', name: 'hr', icon: <Users size={24} />, students: '500' },
  { id: 'ar', name: 'ar', icon: <BookOpen size={24} />, students: '430' },
];

```

#### Update Admin Playground

Modify the string array in this file to update the upload logic:

* `frontend/src/pages/Adminplayground.jsx`

```javascript
const departments = ["cse", "ece", "eee", "mech", "civil", "it"];

```

---

## Usage Guide

1. **Database Connection:** Ensure MongoDB Compass is running so the authentication system can function correctly.
2. **Admin Panel:** Use the admin interface to upload video resources to the server.
3. **Department View:** Once uploaded, resources will be filtered and visible to users according to their assigned department.

