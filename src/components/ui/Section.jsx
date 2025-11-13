export default function Section({ title, children }) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {title}
        </h2>
      )}
      <div className="grid gap-6">{children}</div>
    </section>
  );
}
