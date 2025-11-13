export default function Card({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-md bg-white dark:bg-gray-800 p-6 transition-all duration-300 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
