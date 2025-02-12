import React, { useState } from 'react';

const BookingCalendar = () => {
  // Slot data state
  const [slots, setSlots] = useState([]);
  // Currently selected date (default is today)
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Timezone state (default from browser)
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  // A sample username – in a real app, this would come from authentication
  const [username, setUsername] = useState("JohnDoe");

  // New slot form state
  const [newSlot, setNewSlot] = useState({ start: '', end: '', description: '' });
  // Copy availability state: the source date from which to copy slots
  const [copySourceDate, setCopySourceDate] = useState('');

  // Calendar computations for the current month
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth(); // 0-indexed
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startWeekDay = firstDayOfMonth.getDay();

  const calendarDays = [];
  for (let i = 0; i < startWeekDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(currentYear, currentMonth, d));
  }

  // ----- SLOT MANAGEMENT FUNCTIONS -----
  const handleAddSlot = (e) => {
    e.preventDefault();
    if (newSlot.start && newSlot.end) {
      const newSlotObj = {
        id: Date.now(),
        date: selectedDate.toISOString().split('T')[0],
        start: newSlot.start,
        end: newSlot.end,
        description: newSlot.description
      };
      setSlots([...slots, newSlotObj]);
      setNewSlot({ start: '', end: '', description: '' });
    }
  };

  const handleDeleteSlot = (id) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleCopyAvailability = () => {
    if (copySourceDate) {
      const slotsToCopy = slots.filter(slot => slot.date === copySourceDate);
      const copiedSlots = slotsToCopy.map(slot => ({
        ...slot,
        id: Date.now() + Math.random(),
        date: selectedDate.toISOString().split('T')[0]
      }));
      setSlots([...slots, ...copiedSlots]);
      setCopySourceDate('');
    }
  };

  // Sorted upcoming slots
  const upcomingSlots = [...slots].sort((a, b) =>
    new Date(a.date + 'T' + a.start) - new Date(b.date + 'T' + b.start)
  );
  // Slots for the currently selected day
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const slotsForSelectedDay = slots.filter(slot => slot.date === selectedDateStr);

  // Calendar navigation functions
  const handlePrevMonth = () => {
    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    setSelectedDate(prevMonthDate);
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    setSelectedDate(nextMonthDate);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {username ? `${username}'s Availability` : 'Your Availability'}
          </h1>
          <div className="mt-2 flex items-center space-x-4">
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">Name:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="ml-2 p-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300">Timezone:</label>
              <select
                value={timezone}
                onChange={handleTimezoneChange}
                className="ml-2 p-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="text-black transition-colors"
                >
                  &lt;
                </button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="text-black transition-colors"
                >
                  &gt;
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-gray-600 dark:text-gray-300">
                    {day}
                  </div>
                ))}
                {calendarDays.map((date, index) => (
                  <div
                    key={index}
                    onClick={() => date && setSelectedDate(date)}
                    className={`min-h-[100px] flex flex-col p-2 rounded-lg cursor-pointer transition-all duration-200
                      ${date && date.toISOString().split('T')[0] === selectedDateStr 
                        ? 'bg-black text-white'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100'
                      }`}
                  >
                    {date && (
                      <>
                        <div className="text-sm font-semibold mb-1">{date.getDate()}</div>
                        {(() => {
                          const dateStr = date.toISOString().split('T')[0];
                          const slotsForDate = slots.filter(slot => slot.date === dateStr);
                          if (slotsForDate.length > 0) {
                            return (
                              <div className="flex flex-col gap-1">
                                {slotsForDate.slice(0, 2).map(slot => (
                                  <div 
                                    key={slot.id} 
                                    className={`text-[8px] p-1 rounded ${
                                      date.toISOString().split('T')[0] === selectedDateStr
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-black/10 dark:bg-white/10'
                                    }`}
                                  >
                                    {slot.start}-{slot.end}
                                  </div>
                                ))}
                                {slotsForDate.length > 2 && (
                                  <span className="text-[8px] text-center">
                                    +{slotsForDate.length - 2} more
                                  </span>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Slots for Selected Day */}
            <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Slots for {selectedDateStr}
              </h3>
              {slotsForSelectedDay.length > 0 ? (
                <ul className="space-y-3">
                  {slotsForSelectedDay.map(slot => (
                    <li key={slot.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      <span className="text-gray-800 dark:text-gray-100">
                        {slot.start} - {slot.end} ({slot.description})
                      </span>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No slots available for this day.</p>
              )}
            </div>
          </div>

          {/* Slot Management Panel */}
          <div>
            {/* Add New Slot */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Add New Slot</h3>
              <form onSubmit={handleAddSlot} className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-gray-700 dark:text-gray-300 text-sm">Start Time</label>
                    <input
                      type="time"
                      value={newSlot.start}
                      onChange={(e) => setNewSlot({ ...newSlot, start: e.target.value })}
                      placeholder="00:00"
                      className="w-full p-2 text-center border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-gray-700 dark:text-gray-300 text-sm">End Time</label>
                    <input
                      type="time"
                      value={newSlot.end}
                      onChange={(e) => setNewSlot({ ...newSlot, end: e.target.value })}
                      placeholder="00:00"
                      className="w-full p-2 text-center border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 dark:text-gray-300 text-sm">Description</label>
                  <input
                    type="text"
                    value={newSlot.description}
                    onChange={(e) => setNewSlot({ ...newSlot, description: e.target.value })}
                    className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    placeholder="Event description"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded transition-colors"
                >
                  Add Slot
                </button>
              </form>
            </div>

            {/* Copy Availability */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Copy Availability</h3>
              <div className="flex flex-col space-y-4">
                <input
                  type="date"
                  value={copySourceDate}
                  onChange={(e) => setCopySourceDate(e.target.value)}
                  className="p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
                <button
                  onClick={handleCopyAvailability}
                  className="w-full py-2 bg-black text-white rounded transition-colors"
                >
                  Copy to {selectedDateStr}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Slots List */}
        <div className="mt-10 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">All Upcoming Slots</h3>
          {upcomingSlots.length > 0 ? (
            <ul className="space-y-3">
              {upcomingSlots.map(slot => (
                <li key={slot.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  <span className="text-gray-800 dark:text-gray-100">
                    {slot.date}: {slot.start} - {slot.end} ({slot.description})
                  </span>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">No upcoming slots.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
