# Quiztime
A simple web-based flashcard application for learning and self-testing on various topics.

## Features
- Choose a topic and view flashcards with questions and answers.
- Add your own flashcards, which are saved in your browser (local storage).
- Flip cards to see answers.

## Getting Started
- Download or clone this repository.
- Open index.html in your web browser.
No server is required! All data is loaded from JavaScript files.

## Adding or Editing Flashcards
Static flashcards are defined in data.js inside the staticFlashcards object.
To add a new topic, add a new property to staticFlashcards with an array of question/answer objects.
To add a new card to an existing topic, add a new object to the relevant array.

#### User-Added Flashcards:
Use the form in the app to add your own flashcards. These are saved in your browser and will appear next time you open the app.

## File Structure
index.html – Main HTML file
style.css – App styling
app.js – Main application logic
data.js – Static flashcard data
