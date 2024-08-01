// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE customers (
                id INTEGER PRIMARY KEY, 
                name TEXT NOT NULL, 
                email TEXT UNIQUE NOT NULL, 
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                phone_number TEXT UNIQUE NOT NULL);
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_cars_table",
            sql: "CREATE TABLE cars (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                maker TEXT NOT NULL,
                model TEXT NOT NULL,
                number_plate TEXT UNIQUE NOT NULL,
                km INTEGER NOT NULL,
                customer_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE);
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_estimates_table",
            sql: "
                CREATE TABLE estimates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                works_done TEXT,
                workforce_price REAL NOT NULL,
                hours_worked REAL NOT NULL,
                iva REAL,
                discount REAL,
                notes TEXT,
                workshop_name TEXT,
                workshop_address TEXT,
                workshop_phone_number TEXT,
                workshop_p_iva TEXT,
                km INTEGER NOT NULL,
                car_id INTEGER NOT NULL,
                customer_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
                FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE);
            ",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "add_trigger_for_timestamp",
            sql: "
                CREATE TRIGGER estimates_updated_at AFTER UPDATE ON estimates
                BEGIN
                update estimates SET updated_at = datetime('now');
                END;
            
                CREATE TRIGGER customers_updated_at AFTER UPDATE ON customers
                BEGIN
                update customers SET updated_at = datetime('now');
                END;
            
                CREATE TRIGGER cars_updated_at AFTER UPDATE ON cars
                BEGIN
                update cars SET updated_at = datetime('now');
                END;
            ",
            kind: MigrationKind::Up,
            
        }
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:workshop.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
