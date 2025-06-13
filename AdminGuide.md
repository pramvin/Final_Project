# PiConfess+ Admin Guide

## Configuration

### Changing Wi-Fi Credentials

1. Modify `dietpi-wifi.txt` on the MicroSD card before boot.
2. For runtime changes, connect via serial console and edit network settings using DietPi tools.

### Database Management

- Access MariaDB via:
  ```bash
  sudo mariadb -u root -p
  ```
- To backup database:
  ```bash
  mysqldump -u root -p database_db > backup.sql
  ```
- To restore:
  ```bash
  mysql -u root -p database_db < backup.sql
  ```

### Web Server Management

- Restart Apache:
  ```bash
  sudo systemctl restart apache2
  ```
- Check status:
  ```bash
  sudo systemctl status apache2
  ```

### Maintenace

- Regularly update the system:
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- Monitor disk usage:
  ```bash
  df -h
  ```
- Check logs for errors:
  - Apache: `/var/log/apache2/error.log`
  - MariaDB: `/var/log/mysql/error.log`
- Clean up old or inappropriate confessions by manually deleting from the database if necessary.
