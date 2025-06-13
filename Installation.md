# Installation Instructions for PiConfess+

This guide walks you through installing the PiConfess+ anonymous confession app on a Raspberry Pi Zero 2 W running DietPi.

## Prerequisites

- Raspberry Pi Zero 2 W
- MicroSD card (8GB or larger)
- USB cable and power supply
- Computer to flash the image and configure Wi-Fi
- Internet connection for package installations

## Step 1: Download and Flash DietPi Image

1. Download `DietPi_RPi234-ARMv8-Bookworm.img.xz` from [https://dietpi.com/](https://dietpi.com/)
2. Use Etcher (https://balena.io/etcher/) or similar to flash the image to your MicroSD card.

## Step 2: Configure Headless Setup

1. After flashing, open the MicroSD card folder.
2. Open `dietpi_headless-20250611` folder and copy all files to the root of your MicroSD card.
3. Edit `dietpi-wifi.txt.sample`:
   - Under "Entry 0", add your campus Wi-Fi SSID and password.
   - Under "Entry 1", add your home Wi-Fi SSID and password.
4. Save the changes and copy the edited content to a new file named `dietpi-wifi.txt` on the MicroSD card.

## Step 3: Boot Phase 1

1. Insert the MicroSD card into the Raspberry Pi.
2. Connect the USB cable to the port labeled "USB" (not "PWR").
3. The board will boot and automatically run the headless installation scripts. It will then shut down.

## Step 4: Boot Phase 2

1. Disconnect and reconnect the USB cable.
2. Connect a terminal emulator to the serial console:
   - On macOS, find device by `ls /dev/tty.* | grep -i usb`
   - Use `screen /dev/cu.usbmodemXXXX 115200` to connect
3. Login with:
   - User: `root`
   - Password: `dietpi`
4. If prompted, change the password (e.g., `1234567`).
5. After setup completes, the system will shut down again.

## Step 5: Install Required Software

1. Power on the device again.
2. In the menu, select `dietpi-software`.
3. Scroll to `LAMP: Apache + MariaDB + PHP` and select it.
4. Go back and choose to start installation.

## Step 6: Verify Installation and Setup Project

1. Check Apache status:
   ```bash
    sudo systemctl status apache2
    ```
   
2. Secure MariaDB:
   ```bash
    sudo mysql_secure_installation
   ```
   
3. Install git:
   ```bash
    sudo apt install git
   ```
   
4. Clone project:
   ```bash
    cd /var/www
    sudo git clone https://github.com/pramvin/Final_Project.git
    sudo chown -R www-data:www-data Final_Project
    sudo mkdir -p /var/www/html
    sudo mv Final_Project/* /var/www/html/
    sudo chown -R www-data:www-data /var/www/html
    sudo chmod -R 755 /var/www/html
   ```


## Step 7: Configure Database

1. Login to MariaDB:
   ```bash
    sudo mariadb -u root -p
   ```
   
2. Change root password if needed:
   ```bash
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_new_password';
   ```
   
3. Create database and table:
   ```bash
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
   ```
   
4. Exit MariaDB
   ```bash
    EXIT;
   ```
   
## Troubleshooting
- Make sure the Wi-Fi credentials are correct in `dietpi-wifi.txt`.

- Use the serial console to view logs during boot.

- Check Apache and MariaDB service status if the web app does not load.
