# Nékodoro 

Nékodoro Codédex is a dynamic Pomodoro timer application designed with various interactive widgets. This project includes features like task management, a Spotify music player, weather updates, theme customization.

## Features

- **Pomodoro Timer**: Manage work and break intervals effectively.
- **Task Management**: Add, remove, and track your tasks.
- **Spotify Integration**: Search for songs, play/pause music, and control volume directly in the app.
- **Weather Updates**: Get real-time weather information for your desired location.
- **Theme Customization**: Choose between Default, Sakura, Cozy, and Autumn themes.
- **Drag-and-Drop Interface**: Rearrange widgets to suit your preferences.

---

## File Structure

Here’s an overview of the project structure:

```plaintext
.
├── src/
│   ├── index.html           # Main HTML file containing the app's structure
│   ├── styles.css           # Main stylesheet with all theme and widget styles
│   ├── script.js            # JavaScript logic for widgets and interactivity
│   ├── img/
│   │   ├── nekodoro.gif     # Gif used for the Nékodoro mascot
│   │   └── other-assets/    # Additional image assets
│   ├── sounds/
│       └── bell.wav         # Sound used for timer notifications
│   
├── README.md                # Project documentation
└── LICENSE                  # License file
```

---

## Usage

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Samppii/POMODOROCODEDEX.git
   ```
2. Open the `src/index.html` file in your browser to start using the app.

### Widgets

- **Pomodoro Timer**: Set your session and break times, then click `Start`.
- **Tasks**: Use the task input box to add tasks. Check off completed tasks or clear the list.
- **Spotify**: Log in with Spotify to access the music player. Use the search bar to find songs and control playback.
- **Weather**: Enter a city name and click `Get Weather` to view the current weather.
- **Themes**: Use the theme dropdown in the top-right corner to change the app's appearance.

---

## File Paths for Key Features

- **Pomodoro Timer**: `src/script.js` - Functions for timer and sound management.
- **Task Manager**: `src/script.js` - Functions to add, check, and remove tasks.
- **Spotify Player**: 
  - Authentication and playback logic: `src/script.js`
  - Spotify SDK: `https://sdk.scdn.co/spotify-player.js`
- **Weather Widget**: `src/widgets/weather.js`
- **Themes**: `src/styles.css`

---

## Credits

- **Nékodoro Mascot**: Custom design using `nekodoro.gif`.
- **API Integration**: 
  - Spotify API for music playback.
  - OpenWeatherMap API for real-time weather updates.

