
Is it running?
Is the data right?
Did the data change?
Did I redraw the page?
Did I save it?

1. Beginner Quick Reference
// Array:
libraryItems

// Object:
libraryItem

// String:
item.title

// Add To Array:
.push()

// Remove From Array:
.splice()

// Loop:
for (...)

// Render:
innerHTML +=


2. Frontend Refresher Cheat Sheet

The larger version we just built:

// Search:
.includes()

// Lowercase:
.toLowerCase()

// Sort:
.sort()

// Parameter:
function renderLibraryItems(itemsToRender)


3. Mental Model Sheet

Honestly, this is the most valuable one:

libraryItems
    ↓
Array
    ↓
Entire collection

item
    ↓
Object
    ↓
One record

item.title
    ↓
String
    ↓
One property

Whenever you get lost, ask:

Am I looking at:
    Array?
    Object?
    String?

That question alone solves about 80% of beginner JavaScript confusion.

4. Debugging
User Action
    ↓
Event Listener
    ↓
Function(s)
    ↓
Data Changes
    ↓
UI Updates
    ↓
Storage Updates (optional)

Or Model of how to look at the JavaScript

SCRIPT
1. Setup
   ├─ Variables
   ├─ Arrays / Objects
   └─ References to HTML elements

2. Event Listeners
   ├─ Button clicks
   ├─ Form submissions
   └─ Search input events

3. Functions
   ├─ Add data
   ├─ Delete data
   ├─ Edit data
   ├─ Save data
   └─ Render UI

4. Startup Code
   ├─ Load saved data
   └─ Render initial screen

User does something
        ↓
Event Listener catches it
        ↓
Function runs
        ↓
Data changes
        ↓
UI updates
        ↓
Data saved (optional)

Exmaple:

Click Add Movie
        ↓
addButton listener fires
        ↓
addMovie()
        ↓
movies.push()
        ↓
renderMovies()
        ↓
saveMovies()



