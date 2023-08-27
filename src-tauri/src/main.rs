// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_log::{LogTarget};
use log::{info, warn};
use system_shutdown::{sleep,reboot,shutdown};
use std::process::Command;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn system_sleep() {
    match sleep() {
        Ok(_) => info!("Going to sleep, bye!"),
        Err(error) => warn!("Error going to sleep: {}", error),
    }
}

#[tauri::command]
fn system_reboot() {
    match reboot() {
        Ok(_) => info!("Restarting"),
        Err(error) => warn!("Error restarting: {}", error),
    }
}

#[tauri::command]
fn system_shutdown() {
    match shutdown() {
        Ok(_) => info!("Shutting down, bye!"),
        Err(error) => warn!("Error shutting down: {}", error),
    }
}

#[tauri::command]
fn get_volume() -> i32 {
    let output = Command::new("pactl")
        .arg("get-sink-volume")
        .arg("0")
        .output()
        .expect("get_volume failed");

    let output_stdout = String::from_utf8_lossy(&output.stdout);
    let words = output_stdout.split_whitespace().collect::<Vec<&str>>();
    let vol_percent = words.get(4).unwrap();
    let vol = &vol_percent[0..vol_percent.len() - 1];
    let vol_i32: i32 = vol.parse().unwrap();
    //println!("{}", vol);
    return vol_i32;
}

#[tauri::command]
fn set_volume(volume: i32) {
    let vol_str = format!("{}%", volume.to_string());

    let output = Command::new("pactl")
        .arg("set-sink-volume")
        .arg("0")
        .arg(vol_str)
        .output()
        .expect("toggle_mute failed");
}

#[tauri::command]
fn get_mute_state() -> bool {
    let output = Command::new("pactl")
        .arg("get-sink-mute")
        .arg("0")
        .output()
        .expect("get_mute_state failed");

    let output_stdout = String::from_utf8_lossy(&output.stdout);
    let words = output_stdout.split_whitespace().collect::<Vec<&str>>();
    let state = words.get(1).unwrap();

    return state == &"yes";
}

#[tauri::command]
fn toggle_mute() {
    let output = Command::new("pactl")
        .arg("set-sink-mute")
        .arg("0")
        .arg("toggle")
        .output()
        .expect("toggle_mute failed");
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::default().targets([
            LogTarget::LogDir,
            LogTarget::Stdout,
            LogTarget::Webview,
        ]).build())
        .invoke_handler(tauri::generate_handler![greet, 
                        system_sleep, 
                        system_reboot, 
                        system_shutdown, 
                        get_volume, 
                        set_volume,
                        get_mute_state, 
                        toggle_mute])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
