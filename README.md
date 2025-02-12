# Slot Booking Application

A modern, responsive web application for managing and scheduling time slots. Built with React and styled with Tailwind CSS, featuring a beautiful dark mode interface.

## Features

- 📅 Interactive Calendar Interface
  - Visual representation of available slots
  - Easy navigation between months
  - Click to select dates

- ⏰ Slot Management
  - Add time slots with start and end times
  - Add descriptions to slots
  - View all slots for selected dates
  - Delete unwanted slots

- 🎨 Modern UI/UX
  - Clean and intuitive interface
  - Dark mode support
  - Responsive design for all devices
  - Smooth transitions and animations

- 🔄 Advanced Features
  - Copy availability between dates
  - Timezone support
  - Multiple slots per day
  - Visual indicators for busy days

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Satyam2192/Slot-Booking-App.git
cd slot-booking-application
```

2. Install dependencies:
```bash
npm install

```

3. Start the development server:
```bash
npm run dev

```

4. Open your browser and visit `http://localhost:5173`

## Tech Stack

- **Frontend Framework**: React
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: React Icons
- **Routing**: React Router DOM

## Usage

1. **Adding a Slot**:
   - Select a date from the calendar
   - Fill in the start time and end time
   - Add an optional description
   - Click "Add Slot"

2. **Viewing Slots**:
   - Click on any date to view its slots
   - Slots are displayed in the calendar and in a detailed list below

3. **Copying Availability**:
   - Select a source date with existing slots
   - Choose a target date
   - Click "Copy" to duplicate all slots

4. **Dark Mode**:
   - Toggle dark mode using the button in the header
   - Your preference is saved automatically
