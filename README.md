# PiConfess+ 📢

**Anonymous Confession Web App powered by DietPi on Raspberry Pi Zero 2 W**

PiConfess+ is a lightweight, web-based anonymous confession board designed to run efficiently on a Raspberry Pi Zero 2 W using the minimal DietPi OS. Users can submit anonymous messages and react to confessions using a set of expressive emoji-style buttons (love, laugh, cry, shy).

---

## 🔧 Project Goal

To build a fully functional, headless-deployable LAMP web application (Linux + Apache + MariaDB + PHP) using low-cost hardware and efficient software. This project demonstrates embedded deployment, user interface design, database integration, and basic interaction features.

---

## 🧱 Features

- Anonymous confession submission  
- Live reaction system (❤️ 😂 😢 😳)  
- Trending confessions filter  
- Mobile-friendly interface  
- Lightweight DietPi deployment  

---

## 🖼️ Application Architecture

### Client Side
- `index.html` — Main UI  
- `main.js` — Handles submission, search, and reactions  
- `style.css` — UI styling  

### Server Side (PHP)
- `submit_confession.php` — Save new confessions  
- `react.php` — Add reactions  
- `search.php` — Search confessions  
- `trending.php` — Top reactions display  

### Database Schema

```sql
CREATE TABLE confessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    confession TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    love_reacts INT DEFAULT 0,
    laugh_reacts INT DEFAULT 0,
    cry_reacts INT DEFAULT 0,
    shy_reacts INT DEFAULT 0
);
```

---

## ⚙️ Installation Summary

### 1. Download DietPi Image

Go to [https://dietpi.com](https://dietpi.com) and download:

```
DietPi_RPi234-ARMv8-Bookworm.img.xz
```

### 2. Flash the Image to MicroSD Card

Use [Etcher](https://etcher.io) (or similar) to flash the `.img.xz` file.

### 3. Prepare Headless Installation

- Copy all files from the `dietpi_headless-20250611` folder to the root of the MicroSD card.
- Open `dietpi-wifi.txt.sample` and configure the following:

#### Entry 0: Campus Wi-Fi
```ini
SSID=Your_Campus_WiFi
KEY=Your_Student_ID_Password
```

#### Entry 1: Home Wi-Fi
```ini
SSID=Your_Home_WiFi
KEY=Your_Home_Password
```

- Save the modified file as `dietpi-wifi.txt`.

---

## 🔌 Booting the System

### Phase 1: Headless Setup

- Insert the MicroSD card into the Pi.
- Connect USB cable to the port labeled **USB** (not PWR).
- The system will boot and run configuration scripts, then shut down.

### Phase 2: Serial Console Setup

- Unplug and replug the USB cable to restart.
- Connect to serial using terminal:

#### macOS
```bash
ls /dev/tty.* | grep -i usb
# Example output: /dev/tty.usbmodem14401
screen /dev/tty.usbmodem14401 115200
```

#### Windows
Use Device Manager to find COM port, then open [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) and connect via Serial.  
Baud rate: `115200`

#### Login
```
Username: root
Password: dietpi
```

Change the password when prompted to: `1234567`

---

## 📦 Installing LAMP Stack and Git

### Using DietPi Software Installer
```bash
dietpi-software
```

- Scroll to:
  ```
  [ ] 76 LAMP: Apache + MariaDB + PHP
  ```
- Press Spacebar to mark it with `*`, then go back and press Enter to install.

### After Installation
```bash
sudo systemctl status apache2
sudo mysql_secure_installation
sudo apt install git
```

---

## 🚀 Deploying the Application

### Clone the Project Repository

```bash
cd /var/www
sudo git clone https://github.com/pramvin/Final_Project.git
```

### Move Project Files

```bash
sudo mkdir -p /var/www/html
sudo mv /var/www/Final_Project/* /var/www/html/.
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

---

## 🛢️ Configuring the Database

### Login to MariaDB

```bash
sudo mariadb -u root -p
# Password: 12345678
```

### Commands

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'change_password';

CREATE DATABASE database_db;
USE database_db;

CREATE TABLE confessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    confession TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    love_reacts INT DEFAULT 0,
    laugh_reacts INT DEFAULT 0,
    cry_reacts INT DEFAULT 0,
    shy_reacts INT DEFAULT 0
);

SELECT * FROM confessions;
```

---

## 🎥 Demo & Docs

- 📽️ **Demo Video:** [Link to Presentation Video]([https://your-demo-video-link.com](https://www.youtube.com/watch?v=DwVm6SApvBs))
- 📄 **Project Slides (PDF):** Located in the `doc/` folder of this repository

---

## 📁 Project Structure

```
Final_Project/
├── index.html
├── main.js
├── style.css
├── submit_confession.php
├── react.php
├── search.php
├── trending.php
├── db.php
├── sql.txt
├── doc/
```

---

## 🔗 Links

- 🔗 **GitHub Repository:** [https://github.com/pramvin/Final_Project](https://github.com/pramvin/Final_Project)
- 🔗 **Presentation Video:** [https://www.youtube.com/watch?v=DwVm6SApvBs](https://www.youtube.com/watch?v=DwVm6SApvBs)

---

## 👨‍💻 Author

- **Group: Steven Botak** — Developer & Presenter

---

## 📝 License

This project is intended for academic demonstration only. No real data is collected or stored.
