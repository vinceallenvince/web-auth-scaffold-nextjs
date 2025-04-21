/**
 * Structured logging utility for application events
 * Provides consistent log formatting and centralized log management
 */

import fs from 'fs';
import path from 'path';

// Define log levels for different types of messages
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

// Define log categories to organize logs by feature
export enum LogCategory {
  EMAIL = 'EMAIL',
  AUTH = 'AUTH',
  DATABASE = 'DATABASE',
  API = 'API',
  GENERAL = 'GENERAL',
}

// Interface for log entry object
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  data?: Record<string, unknown>;
  error?: Error | unknown;
}

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Creates a formatted log entry
 */
function createLogEntry(
  level: LogLevel,
  category: LogCategory,
  message: string,
  data?: Record<string, unknown>,
  error?: Error | unknown
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    category,
    message,
    data,
    error,
  };
}

/**
 * Formats a log entry as a string for console output
 */
function formatLogForConsole(entry: LogEntry): string {
  // Define color codes for different log levels
  const colors = {
    [LogLevel.DEBUG]: '\x1b[34m', // Blue
    [LogLevel.INFO]: '\x1b[36m',  // Cyan
    [LogLevel.SUCCESS]: '\x1b[32m', // Green
    [LogLevel.WARNING]: '\x1b[33m', // Yellow
    [LogLevel.ERROR]: '\x1b[31m',   // Red
    reset: '\x1b[0m',  // Reset
  };

  // Create prefix with timestamp, level and category
  const prefix = `${colors[entry.level]}[${entry.level}]\x1b[0m [${entry.category}] ${entry.timestamp}:`;
  
  // Format main message
  let output = `${prefix} ${entry.message}`;
  
  // Add data if available
  if (entry.data) {
    try {
      const dataStr = JSON.stringify(entry.data, null, 2);
      output += `\nData: ${dataStr}`;
    } catch (e) {
      output += '\nData: [Could not stringify data]';
    }
  }
  
  // Add error information if available
  if (entry.error) {
    if (entry.error instanceof Error) {
      output += `\nError: ${entry.error.message}`;
      if (entry.error.stack) {
        output += `\nStack: ${entry.error.stack}`;
      }
    } else {
      try {
        output += `\nError: ${JSON.stringify(entry.error)}`;
      } catch (e) {
        output += '\nError: [Could not stringify error]';
      }
    }
  }
  
  return output;
}

/**
 * Formats a log entry as a string for file output
 */
function formatLogForFile(entry: LogEntry): string {
  // Convert entry to JSON string for structured logging
  try {
    return JSON.stringify(entry) + '\n';
  } catch (e) {
    // Fall back to simple format if JSON stringification fails
    return `${entry.timestamp} [${entry.level}] [${entry.category}]: ${entry.message}\n`;
  }
}

/**
 * Writes a log entry to the appropriate log file
 */
function writeToLogFile(entry: LogEntry): void {
  try {
    // Use different log files for different categories
    const logFile = path.join(logDir, `${entry.category.toLowerCase()}.log`);
    const formattedLog = formatLogForFile(entry);
    
    // Append to log file
    fs.appendFileSync(logFile, formattedLog);
  } catch (error) {
    // If logging fails, output to console as fallback
    console.error('Failed to write to log file:', error);
  }
}

/**
 * Log handler that processes log entries
 */
function handleLog(entry: LogEntry): void {
  // Output to console
  console.log(formatLogForConsole(entry));
  
  // Write to log file
  writeToLogFile(entry);
}

/**
 * Main logging function
 */
export function log(
  level: LogLevel,
  category: LogCategory,
  message: string,
  data?: Record<string, unknown>,
  error?: Error | unknown
): void {
  const entry = createLogEntry(level, category, message, data, error);
  handleLog(entry);
}

/**
 * Convenience function for email-related logs
 */
export const emailLogger = {
  debug: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.DEBUG, LogCategory.EMAIL, message, data),
  
  info: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.INFO, LogCategory.EMAIL, message, data),
  
  success: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.SUCCESS, LogCategory.EMAIL, message, data),
  
  warning: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.WARNING, LogCategory.EMAIL, message, data),
  
  error: (message: string, error?: Error | unknown, data?: Record<string, unknown>) => 
    log(LogLevel.ERROR, LogCategory.EMAIL, message, data, error),
};

/**
 * Convenience function for auth-related logs
 */
export const authLogger = {
  debug: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.DEBUG, LogCategory.AUTH, message, data),
  
  info: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.INFO, LogCategory.AUTH, message, data),
  
  success: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.SUCCESS, LogCategory.AUTH, message, data),
  
  warning: (message: string, data?: Record<string, unknown>) => 
    log(LogLevel.WARNING, LogCategory.AUTH, message, data),
  
  error: (message: string, error?: Error | unknown, data?: Record<string, unknown>) => 
    log(LogLevel.ERROR, LogCategory.AUTH, message, data, error),
}; 