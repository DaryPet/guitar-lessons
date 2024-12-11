# Project Name: Guitar Lessons App

## Overview

The **Guitar Lessons App with  Personal login, access to documents, notes, and chat with teacher** is a web application that enables students to easily manage lessons, notes, chat with teacher in a real time, send homework, kinks wit video, etc. This project is designed with an intuitive user interface, making it suitable for both registered and unregistered users who wants to learn guitar. The system provides tools for document/music notes management, managin lessons with automatic field filling, and administrative access for theacter to oversee all operations.

## Features

### 1. User Management

- **Registration and Login**: Student can register to create an account and securely log in. Authentication is done via a standard email and password combination.
- **User Dashboard**: Registered student have their own personal dashboard where they can:
  - **Add and receive form teacher - Documents/Notes**.
  - **Delete Documents**: Remove documents that are no longer needed.
  - **View Documents**: Review the uploaded documents at any time.

### 2. Meeting Booking System

- **Booking trial lesson for All**: Both registered and unregistered users can book lessons.
- **Calendar Integration**:
  - The calendar is configured to show **free days and hours** only.
  - It checks availability and **prevents double booking** by marking time slots that are already taken as unavailable.
- **Email Confirmation**: After booking a meeting, an email with booking confirmation is sent to the provided email address, ensuring the user has a record of their appointment.

### 3. Chat With teacher in a real time

- **Loged in student**: Student can chat, send video links, songs that he want to play, notes, qustions, homework etc in a real time chat.

### 4. Teacher Features

- **Teacher Dashboard**:
  - View **all lessons** scheduled by both registered and unregistered users.
  - Access and manage **all documents/notes** uploaded by registered student.
  - Upload documents/notes for specific registered student to make personalized resources available.
  - to try use **username - admin2; password - admin123**

## Technologies Used

The following technologies were used to create this system:

- **Backend**: Nest.js for building a scalable and modular server-side application.
- **API**: GraphQL for providing a flexible and efficient API for interacting with the backend.
- **Frontend**: React.js for creating a dynamic and responsive user interface.
- **Database**: PostgreSQL for data storage, ensuring that user details, documents, and meeting information are stored securely.
- **Authentication**: JWT (JSON Web Tokens) for handling user authentication and maintaining session security.
- **Calendar Integration**: FullCalendar.js library for managing and displaying booking times.
- **Email Service**: Nodemailer for sending booking confirmation emails to users.
- **Websoket**: for real time chat.

## Getting Started

To get a copy of the project up and running on your local machine for development and testing, follow these steps.

### Prerequisites

- Node.js installed (version 14+ recommended)

### Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/smart-booking-system.git
   ```
2. **Navigate to the project directory**:
   ```
   cd smart-booking-system
   ```
3. **Install dependencies for both backend and frontend**:
   ```
   npm install
   cd client
   npm install
   ```
4. **Set up environment variables**:
   Create a `.env` file in the root directory with the following:

   ```

   JWT_SECRET=<Your JWT Secret>
   EMAIL_USER=<Your Email Address>
   EMAIL_PASS=<Your Email Password>
   ```

5. **Run the application**:
   - **Backend**: In the root directory, run:
     ```
     npm run start:dev
     ```
   - **Frontend**: Navigate to the client directory and run:
     ```
     npm start
     ```

### Usage

- **User Registration and Login**: Go to `/register` or `/login` to create an account or log in.
- **Book a Meeting**: Visit the booking page and choose an available time slot.
- **Document Management**: After login, navigate to the dashboard to upload or manage documents.
- **Admin Panel**: Admins can log in to view all documents, meetings, and manage user-specific uploads.

## Future Enhancements

- **Google Calendar Sync**: Allow users to sync their bookings with Google Calendar.
- **Notifications**: Add SMS notifications in addition to email confirmations.
- **Recurring Bookings**: Enable users to set up recurring meetings.

## Contributing

Contributions are welcome! Please create a pull request or open an issue if you have any suggestions or improvements.

## Contact

If you have any questions or need support, feel free to contact the project owner at [d7akkord@gmail.com].
