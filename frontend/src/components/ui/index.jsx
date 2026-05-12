import React from "react";

export function Card({ children, hover = false, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
        hover ? "hover:shadow-lg transition-shadow duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children, variant = "primary", size = "md" }) {
  const variants = {
    primary: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    success: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    warning: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    danger: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-semibold",
    md: "px-3 py-1 text-sm font-semibold",
    lg: "px-4 py-2 text-base font-semibold",
  };

  return (
    <span className={`rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50",
    secondary:
      "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
    success: "bg-green-600 text-white hover:bg-green-700 disabled:opacity-50",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-lg transition-all duration-200 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ value, max, showLabel = true, className = "" }) {
  const percentage = (value / max) * 100;

  return (
    <div className={className}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">{value} / {max}</div>}
    </div>
  );
}

export function StatCard({ icon, label, value, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200",
    green: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200",
    red: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200",
    purple:
      "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-200",
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[color]}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <p className="text-sm opacity-75 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export function Input({ placeholder, value, onChange, type = "text", disabled = false, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    />
  );
}

export function Select({ options, value, onChange, disabled = false, className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function RadioGroup({ name, options, value, onChange, disabled = false }) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            disabled={disabled}
            className="w-5 h-5 accent-blue-600 dark:accent-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <span className="text-gray-700 dark:text-gray-300">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
