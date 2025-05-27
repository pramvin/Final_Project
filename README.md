# PiConfess+

A simple web-based anonymous confession board built with **PHP**, **JavaScript**, and **MariaDB**, designed to run on devices like the **Raspberry Pi Zero 2 W**.

Users can:
- Submit anonymous confessions
- React with emojis (❤️ 😂 😭 😳)
- Search confessions
- View trending posts

---

## 📁 Project Structure

PiConfess+

├── index.html (main websote interface)

├── main.js

├── style.css

├── submit_confession.php

├── search.php

├── trending.php

├── react.php

├── db.php

└── README.md

---

## 🚀 How to Run

### 1. Install Requirements

Make sure you have the following installed:

- [Apache](https://httpd.apache.org/) or any web server
- [PHP (>= 7.4)](https://www.php.net/)
- [MariaDB or MySQL](https://mariadb.org/)

On Raspberry Pi:

```
bash

sudo apt update
sudo apt install apache2 php mariadb-server php-mysql
```
2. Set Up Database
  Log in to MariaDB:
  ```
  bash

  sudo mariadb
  ```

  Create the database and table:
  ```
  sql

  CREATE DATABASE database_db;
  USE database_db;
  
  CREATE TABLE confessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_nsfw BOOLEAN DEFAULT FALSE,
    love_reacts INT DEFAULT 0,
    laugh_reacts INT DEFAULT 0,
    cry_reacts INT DEFAULT 0,
    shy_reacts INT DEFAULT 0
    confesstion TEXT NOT NULL,
  );

  CREATE TABLE reactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      confession_id INT NOT NULL,
      reaction_type ENUM('love', 'laugh', 'cry', 'shy') NOT NULL,
      FOREIGN KEY (confession_id) REFERENCES confessions(id) ON DELETE CASCADE
  );
  ```
  Create a user (optional but recommended):
  ```
  sql

  CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'your_password';
  GRANT ALL PRIVILEGES ON database_db.* TO 'your_user'@'localhost';
  FLUSH PRIVILEGES;
  ```

  Edit db.php with your DB credentials:
  ```
  php
  
  $host = 'localhost';
  $db   = 'database_db';
  $user = 'your_user';
  $pass = 'your_password';
  ```

🌐 Usage
Place all project files in your Apache web root (e.g., /var/www/html/).

Access your app in a browser:
http://localhost/ or http://<your-raspberry-pi-ip>/

Start confessing!






